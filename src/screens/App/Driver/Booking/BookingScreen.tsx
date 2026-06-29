import { useFocusEffect } from '@react-navigation/native';
import { getDistance } from 'geolib';
import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import NavigateToPickupSheet from '../../../../components/driver/NavigateToPickupSheet';
import BaseMapDriver, {
  MarkerData,
} from '../../../../components/map/BaseMapDriver';
import useDriverTrips from '../../../../hooks/useDriverTrips';
import { useDriverStore } from '../../../../stores/driverStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { showAlert } from '../../../../utils/functions';
import TripCompletedSheet from '../../../../components/driver/TripCompletedSheet';

// SEARCHING / ASSIGNED -> ASSIGNED
// ARRIVED / STARTED -> trip_in_progress
// COMPLETED -> trip_completed

const reasons = [
  {
    id: '1',
    title: 'Patient did not answer',
    icon: 'phone-remove',
  },
  {
    id: '2',
    title: 'Patient not at pickup',
    icon: 'map-marker-remove',
  },
  {
    id: '3',
    title: 'Unable to reach pickup location',
    icon: 'road-variant',
  },
  {
    id: '4',
    title: 'Vehicle issue / Breakdown',
    icon: 'car-wrench',
  },
  {
    id: '5',
    title: 'Emergency call received',
    icon: 'ambulance',
  },
  {
    id: '6',
    title: 'Safety concerns',
    icon: 'shield-alert',
  },
  {
    id: '7',
    title: 'Patient requested cancellation',
    icon: 'account-cancel',
  },
  {
    id: '8',
    title: 'Other',
    icon: 'help-circle-outline',
  },
];
const BookingScreen = () => {
  const { currentTrip, setTripStep, tripStep } = useDriverStore();
  const { arrived, cancel, start, complete, paymentReceived } =
    useDriverTrips();

  const { currentLocation } = useLocationStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const styles = useGlobalStyles();

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
        bottomSheetRef.current?.snapToIndex(0);
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

    if (
      currentTrip?.pickupLocation?.lat != null &&
      currentTrip?.pickupLocation?.lng != null
    ) {
      return {
        latitude: currentTrip.pickupLocation.lat,
        longitude: currentTrip.pickupLocation.lng,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
    }

    return {
      latitude: 24.8607,
      longitude: 67.0011,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
  }, [currentLocation, currentTrip]);

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

    const distanceKm = Number((distanceMeters / 1000).toFixed(1));
    const etaMinutes = Math.max(1, Math.ceil((distanceKm / 30) * 60));

    return {
      distanceKm,
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
    console.log(driver, ',');
    return {
      distanceKm,
      etaMinutes,
    };
  }, [markers]);

  const handleShowAlert = () => {
    showAlert(() => {
      setTripStep('CANCEL');
    }, 'Are you sure you want to cancel the ride?');
  };

  const tripSheetConfig = {
    ASSIGNED: {
      handlePress: () => arrived(currentTrip?._id),
      etaMinutes: pickupMeta.etaMinutes,
      distanceKm: pickupMeta.distanceKm,
      title: 'Navigate to Pickup',
      btnTitle: 'Arrived',
      handleCancel: handleShowAlert,
    },
    WAITING: {
      handlePress: () => start(currentTrip?._id),
      etaMinutes: destinationMeta.etaMinutes,
      distanceKm: destinationMeta.distanceKm,
      title: 'Reached at Pickup',
      btnTitle: 'Start Trip',
      showWaiting: true,
      handleCancel: handleShowAlert,
    },
    STARTED: {
      handlePress: () => complete(currentTrip?._id),
      etaMinutes: destinationMeta.etaMinutes,
      distanceKm: destinationMeta.distanceKm,
      title: 'Trip In Progress',
      btnTitle: 'Complete Trip',
      showCancel: false,
    },
    COMPLETED: {
      handlePress: () => complete(currentTrip?._id),
      etaMinutes: destinationMeta.etaMinutes,
      distanceKm: destinationMeta.distanceKm,
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
          reasons={reasons}
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

  return (
    <View style={globalStyles.flex}>
      <BaseMapDriver
        markers={markers}
        step={tripStep}
        initialRegion={initialRegion}
        title="Current Booking"
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['70%', '80%']}
        enablePanDownToClose={false}
        backgroundStyle={styles.card}
      >
        {renderBottomSheet()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
