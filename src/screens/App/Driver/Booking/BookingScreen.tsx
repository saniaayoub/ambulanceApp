import { useFocusEffect } from '@react-navigation/native';
import { getDistance } from 'geolib';
import React, { useEffect, useMemo, useRef } from 'react';
import { Alert, View } from 'react-native';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import NavigateToPickupSheet from '../../../../components/driver/NavigateToPickupSheet';
import BaseMapDriver, {
  MarkerData,
} from '../../../../components/map/BaseMapDriver';
import useDriverTrips from '../../../../hooks/useDriverTrips';
import { useDriverStore } from '../../../../stores/driverStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { formatDistance, showAlert } from '../../../../utils/functions';
import TripCompletedSheet from '../../../../components/driver/TripCompletedSheet';
import { reasons_driver, screenHeight } from '../../../../utils/constants';
import BottomSheet from '../../../../components/BottomSheet';
import { Modalize } from 'react-native-modalize';
import { moderateScale, verticalScale } from 'react-native-size-matters';

// SEARCHING / ASSIGNED -> ASSIGNED
// ARRIVED / STARTED -> trip_in_progress
// COMPLETED -> trip_completed

const BookingScreen = ({ navigation }: any) => {
  const bottomSheetRef = useRef<Modalize>(null);
  const { currentTrip, tripTracking, setTripStep, tripStep } = useDriverStore();
  const { currentLocation } = useLocationStore();
  const { arrived, cancel, start, complete, paymentReceived } =
    useDriverTrips();

  const markers: MarkerData[] = useMemo(() => {
    const list: MarkerData[] = [];

    if (
      currentLocation?.latitude != null &&
      currentLocation?.longitude != null
    ) {
      list.push({
        id: 'driver',
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        type: 'driver',
        title: 'Driver',
      });
    }
    const pickUpLat = currentTrip?.pickupLocation?.lat;
    const pickUpLng = currentTrip?.pickupLocation?.lng;

    if (
      currentTrip?.pickupLocation?.lat != null &&
      currentTrip?.pickupLocation?.lng != null
    ) {
      list.push({
        id: 'pickup',
        latitude: pickUpLat,
        longitude: pickUpLng,
        type: 'pickup',
        title: 'Pickup',
      });
    }

    const destinationLat = currentTrip?.destination?.lat;
    const destinationLng = currentTrip?.destination?.lng;

    if (destinationLat != null && destinationLng != null) {
      list.push({
        id: 'destination',
        latitude: destinationLat,
        longitude: destinationLng,
        type: 'destination',
        title: 'Destination',
      });
    }

    return list;
  }, [currentLocation, currentTrip]);

  useFocusEffect(
    React.useCallback(() => {
      requestAnimationFrame(() => {
        bottomSheetRef.current?.open();
      });

      return () => {};
    }, []),
  );

  const initialRegion = useMemo(() => {
    if (
      currentLocation?.latitude != null &&
      currentLocation?.longitude != null
    ) {
      return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
    }

    // if (
    //   currentTrip?.pickupLocation?.lat != null &&
    //   currentTrip?.pickupLocation?.lng != null
    // ) {
    //   return {
    //     latitude: currentTrip.pickupLocation.lat,
    //     longitude: currentTrip.pickupLocation.lng,
    //     latitudeDelta: 0.012,
    //     longitudeDelta: 0.012,
    //   };
    // }

    return {
      latitude: 24.8607,
      longitude: 67.0011,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
  }, [currentLocation]);
  // }, [currentLocation, currentTrip]);

  const pickupMeta = useMemo(() => {
    const driver = markers.find(m => m.id === 'driver');
    const pickup = markers.find(m => m.id === 'pickup');

    if (!driver || !pickup) {
      return {
        distanceKm: null,
        etaMinutes: null,
      };
    }

    const distanceMeters = getDistance(
      {
        latitude: driver.latitude,
        longitude: driver.longitude,
      },
      {
        latitude: pickup.latitude,
        longitude: pickup.longitude,
      },
    );

    console.log(driver, pickup, 'lo');

    const distanceKm = Number((distanceMeters / 1000).toFixed(1));
    const etaMinutes = Math.max(1, Math.ceil((distanceKm / 30) * 60));

    return {
      distanceMeters,
      etaMinutes,
    };
  }, [markers]);

  const destinationMeta = useMemo(() => {
    const driver = markers.find(m => m.id === 'driver');
    const destination = markers.find(m => m.id === 'destination');

    if (!driver || !destination) {
      return {
        distanceKm: null,
        etaMinutes: null,
      };
    }

    const distanceMeters = getDistance(
      {
        latitude: driver.latitude,
        longitude: driver.longitude,
      },
      {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    );

    const distanceKm = Number((distanceMeters / 1000).toFixed(1));
    const etaMinutes = Math.max(1, Math.ceil((distanceKm / 30) * 60));
    return {
      distanceMeters,
      etaMinutes,
    };
  }, [markers]);

  useEffect(() => {
    if (tripStep === 'idle') {
      navigation.goBack();
      Alert.alert('User cancelled the trip');
    }
  }, [tripStep, navigation]);

  const handleShowAlert = () => {
    showAlert(() => {
      setTripStep('CANCEL');
    }, 'Are you sure you want to cancel the ride?');
  };
  console.log(
    tripTracking,
    pickupMeta,
    destinationMeta,
    'lltripTracking?.etaText',
  );
  const tripSheetConfig = {
    ASSIGNED: {
      handlePress: () => arrived(currentTrip?._id),
      etaMinutes: tripTracking?.etaText ?? pickupMeta?.etaMinutes,
      distance:
        tripTracking?.distanceText ??
        formatDistance(pickupMeta?.distanceMeters),
      title: 'Navigate to Pickup',
      btnTitle: 'Arrived',
      handleCancel: handleShowAlert,
    },
    WAITING: {
      handlePress: () => start(currentTrip?._id),
      etaMinutes: tripTracking?.etaText ?? destinationMeta?.etaMinutes,
      distance:
        tripTracking?.distanceText ??
        formatDistance(destinationMeta?.distanceMeters),
      title: 'Reached at Pickup',
      btnTitle: 'Start Trip',
      showWaiting: true,
      handleCancel: handleShowAlert,
    },
    STARTED: {
      handlePress: () => complete(currentTrip?._id),
      etaMinutes: tripTracking?.etaText ?? destinationMeta?.etaMinutes,
      distance:
        tripTracking?.distanceText ??
        formatDistance(destinationMeta?.distanceMeters),

      title: 'Trip In Progress',
      btnTitle: 'Complete Trip',
      showCancel: false,
    },
    COMPLETED: {
      handlePress: () => complete(currentTrip?._id),
      etaMinutes: tripTracking?.etaText ?? destinationMeta?.etaMinutes,
      distance:
        tripTracking?.distanceText ??
        formatDistance(destinationMeta?.distanceMeters),

      title: 'Trip Completed',
      btnTitle: 'Go Back to Home',
      showCancel: false,
      disableActionButton: false,
    },
  };

  const renderBottomSheet = () => {
    if (tripStep === 'CANCEL') {
      return (
        <CancelRideBottomSheet
          reasons={reasons_driver}
          onKeepBooking={() => setTripStep(currentTrip?.status)}
          onCancelBooking={reason => cancel(currentTrip?._id, reason)}
        />
      );
    }

    if (tripStep === 'COMPLETED') {
      return (
        <TripCompletedSheet
          currentTrip={currentTrip}
          onDone={() => {
            if (
              currentTrip?.paymentMethod === 'CASH' &&
              currentTrip?.paymentStatus === 'PENDING'
            ) {
              paymentReceived(currentTrip._id);
            }
          }}
        />
      );
    }

    const config = tripSheetConfig[tripStep as keyof typeof tripSheetConfig];

    if (!config) return null;

    return <NavigateToPickupSheet currentTrip={currentTrip} {...config} />;
  };

  const getBottomSheetHeight = (status: TripStatus) => {
    switch (status) {
      case 'ASSIGNED':
      case 'WAITING':
      case 'STARTED':
        return screenHeight * 0.5;

      case 'COMPLETED':
        return screenHeight * 0.7;
      case 'CANCEL':
        return screenHeight * 0.85;

      default:
        return moderateScale(300);
    }
  };
  console.log(tripStep, 'l');

  return (
    <View style={globalStyles.flex}>
      <BaseMapDriver
        markers={markers}
        step={tripStep}
        initialRegion={initialRegion}
        title="Current Booking"
      />

      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        height={getBottomSheetHeight(tripStep)}
      >
        {renderBottomSheet()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
