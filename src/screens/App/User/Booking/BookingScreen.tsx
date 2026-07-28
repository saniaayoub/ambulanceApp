import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Keyboard, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { moderateScale } from 'react-native-size-matters';
import AppButton from '../../../../components/AppButton';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import DriverAssignedSheet from '../../../../components/booking/DriverAssignedSheet';
import LocationSheet from '../../../../components/booking/LocationSheet';
import RideCompletedSheet from '../../../../components/booking/RideCompletedSheet';
import SearchingSheet from '../../../../components/booking/SearchingSheet';
import TripDetailsSheet from '../../../../components/booking/TripDetailsSheet';
import BottomSheet from '../../../../components/BottomSheet';
import BaseMap from '../../../../components/map/BaseMap';
import { useBooking } from '../../../../hooks/useBooking';
import { useLocation } from '../../../../hooks/useLocation';
import { BookingStep, useBookingStore } from '../../../../stores/bookingStore';
import { Location, useLocationStore } from '../../../../stores/locationStore';
import { globalStyles } from '../../../../styles/globalStyles';
import { reasons_user, screenHeight } from '../../../../utils/constants';
import { showAlert } from '../../../../utils/functions';

const BookingScreen = () => {
  const bottomSheetRef = useRef<Modalize>(null);
  const { currentLocation } = useLocationStore();
  const {
    getEstimate,
    getOnlineDriversList,
    drivers: nearbyDrivers,
    handleCreateBooking,
    stopSearching,
    handleBookingCancel,
    submitReviewHandler,
  } = useBooking();
  const { getLocationWithName } = useLocation();
  const bookingStep = useBookingStore(s => s.bookingStep);
  const trip = useBookingStore(s => s.trip);
  const pickupLocation = useBookingStore(s => s.pickupLocation);
  const destinationLocation = useBookingStore(s => s.destinationLocation);
  const selectedAmbulance = useBookingStore(s => s.selectedAmbulance);
  const driverTracking = useBookingStore(s => s.driverLocation);

  const setPickupLocation = useBookingStore(s => s.setPickupLocation);
  const setDestinationLocation = useBookingStore(s => s.setDestinationLocation);
  const setSelectedAmbulance = useBookingStore(s => s.setSelectedAmbulance);
  const setStep = useBookingStore(s => s.setStep);

  const region = useMemo(() => {
    return {
      latitude: currentLocation?.latitude || 24.606,
      longitude: currentLocation?.longitude || 67.101,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [currentLocation]);

  const [selected, setSelected] = useState({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [estimate, setEstimate] = useState(null);
  console.log(driverTracking, 'driverTracking');

  useFocusEffect(
    useCallback(() => {
      if (trip?.status === 'SEARCHING') {
        getOnlineDriversList(trip?.ambulanceType, trip?.pickupLocation);
      }

      requestAnimationFrame(() => {
        bottomSheetRef.current?.open();
      });
    }, []), // Keep this array empty
  );

  useEffect(() => {
    if (trip?.status === 'PAID') {
      bottomSheetRef.current?.open();
    }
  }, [trip]);
  const markers = useMemo(
    () => [
      ...(pickupLocation
        ? [
            {
              id: 'pickup',
              latitude: pickupLocation.latitude,
              longitude: pickupLocation.longitude,
              type: 'pickup' as const,
            },
          ]
        : []),

      ...(destinationLocation
        ? [
            {
              id: 'destination',
              latitude: destinationLocation.latitude,
              longitude: destinationLocation.longitude,
              type: 'destination' as const,
            },
          ]
        : []),

      ...(bookingStep === 'SEARCHING'
        ? nearbyDrivers.map((item: any) => ({
            id: item?.user?.phone, // or any unique value
            latitude: item?.currentLocation?.lat,
            longitude: item?.currentLocation?.lng,
            type: 'driver' as const,
          }))
        : []),
    ],
    [pickupLocation, destinationLocation, bookingStep, nearbyDrivers],
  );

  const handleRideCancel = () => {
    showAlert(async () => {
      setStep('CANCELLED');
    }, 'Are you sure you want to cancel this ride?');
  };

  const handleSearchStart = useCallback(async () => {
    await handleCreateBooking(
      pickupLocation,
      destinationLocation,
      selectedAmbulance?.type,
    );
  }, [
    pickupLocation,
    destinationLocation,
    selectedAmbulance,
    handleCreateBooking,
  ]);

  const changeLocationOnMap = useCallback(() => {
    Keyboard.dismiss();

    setTimeout(() => {
      bottomSheetRef.current?.close();
    }, 100);
  }, []);

  const renderSheetContent = () => {
    switch (bookingStep) {
      case 'PICKUP':
        return (
          <LocationSheet
            pickupLocation={pickupLocation}
            currentStep={bookingStep}
            onCurrentLocationPress={() => {
              if (!currentLocation) return;
              setPickupLocation(currentLocation);
              setStep('DESTINATION');
            }}
            onPressChangeonMap={changeLocationOnMap}
            onSelectLocation={location => {
              setPickupLocation(location);
              setStep('DESTINATION');
            }}
          />
        );

      case 'DESTINATION':
        return (
          <LocationSheet
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
            currentStep={bookingStep}
            onSelectLocation={getEstimatedData}
            onPressChangeonMap={changeLocationOnMap}
          />
        );

      case 'TRIP':
        return (
          <TripDetailsSheet
            currentStep={bookingStep}
            bookingData={{ ...(estimate || {}), drivers: nearbyDrivers }}
            selectedAmbulance={selectedAmbulance}
            pickupLocation={pickupLocation?.address}
            destinationLocation={destinationLocation?.address}
            setSelectedAmbulance={setSelectedAmbulance}
            onNext={handleSearchStart}
          />
        );

      case 'SEARCHING':
        return (
          <SearchingSheet
            nearbyCount={nearbyDrivers?.length}
            estimatedTime="20-45 sec"
            currentStep={bookingStep}
            onStopSearching={stopSearching}
          />
        );

      case 'ASSIGNED':
        return (
          <DriverAssignedSheet
            onCancel={handleRideCancel}
            trip={trip}
            tracking={driverTracking?.tracking}
          />
        );

      case 'WAITING':
        return (
          <DriverAssignedSheet
            trip={trip}
            onCancel={handleRideCancel}
            tracking={driverTracking?.tracking}
          />
        );

      case 'STARTED':
        return (
          <DriverAssignedSheet
            trip={trip}
            tracking={driverTracking?.tracking}
          />
        );

      case 'COMPLETED':
        return (
          <RideCompletedSheet
            trip={trip}
            onSubmitReview={submitReviewHandler}
          />
        );

      case 'CANCELLED':
        return (
          <CancelRideBottomSheet
            onKeepBooking={() => setStep(trip?.status)}
            reasons={reasons_user}
            onCancelBooking={handleBookingCancel}
          />
        );

      default:
        return null;
    }
  };

  const onConfirmLocation = async () => {
    const location = await getLocationWithName(
      selected?.latitude,
      selected?.longitude,
    );

    if (!location) return;

    if (bookingStep === 'PICKUP') {
      setPickupLocation(location);
    } else {
      setDestinationLocation(location);
    }

    bottomSheetRef.current?.open();
  };

  const getEstimatedData = async (location: Location) => {
    setDestinationLocation(location);
    let data = await getEstimate({
      pickupLocation: pickupLocation,
      destination: location,
      ambulanceType: selectedAmbulance?.type,
    });
    getOnlineDriversList(selectedAmbulance?.type, pickupLocation);
    setStep('TRIP');
    setEstimate(data);
  };

  const showCenterPin =
    bookingStep === 'PICKUP' || bookingStep === 'DESTINATION';

  const getBottomSheetHeight = (status: BookingStep) => {
    switch (status) {
      case 'PICKUP':
      case 'DESTINATION':
      case 'CANCELLED':
        return screenHeight * 0.9;

      case 'COMPLETED':
        return screenHeight * 0.98;
      case 'ASSIGNED':
      case 'STARTED':
      case 'WAITING':
      case 'TRIP':
        return screenHeight * 0.8;

      case 'SEARCHING':
        return screenHeight * 0.5;

      default:
        return moderateScale(300);
    }
  };

  return (
    <View style={globalStyles.flex}>
      <BaseMap
        initialRegion={region}
        markers={markers}
        step={bookingStep}
        title={'Booking Ambulance'}
        onRegionChangeComplete={setSelected}
        showCenterPin={showCenterPin}
      >
        <AppButton
          title="Confirm Location"
          style={globalStyles.absBottomTxt}
          onPress={onConfirmLocation}
        />
      </BaseMap>

      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        height={getBottomSheetHeight(bookingStep)}
      >
        {renderSheetContent()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
