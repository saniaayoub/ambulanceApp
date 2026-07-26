import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InteractionManager, Keyboard, Platform, View } from 'react-native';
import BaseMap from '../../../../components/map/BaseMap';
import { Modalize } from 'react-native-modalize';
import TripDetailsSheet from '../../../../components/booking/TripDetailsSheet';
import DriverAssignedSheet from '../../../../components/booking/DriverAssignedSheet';
import LocationSheet from '../../../../components/booking/LocationSheet';
import RideCompletedSheet from '../../../../components/booking/RideCompletedSheet';
import SearchingSheet from '../../../../components/booking/SearchingSheet';

import { bookingSteps, useBooking } from '../../../../hooks/useBooking';
import { DrawerStackParamList } from '../../../../navigation/DriverDrawer';

import { useBookingStore } from '../../../../stores/bookingStore';
import { Location, useLocationStore } from '../../../../stores/locationStore';

import { Region } from 'react-native-maps';
import AppButton from '../../../../components/AppButton';
import { useLocation } from '../../../../hooks/useLocation';
import { globalStyles } from '../../../../styles/globalStyles';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { showAlert } from '../../../../utils/functions';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { screenHeight } from '../../../../utils/constants';
// import { socket } from '../../../../services/socketService';

const reasons = [
  {
    id: '1',
    title: "Driver didn't answer",
    icon: 'phone-remove',
  },
  {
    id: '2',
    title: 'Driver not at pickup',
    icon: 'map-marker-remove',
  },
  {
    id: '3',
    title: 'Driver asked me to cancel',
    icon: 'account-cancel',
  },
  {
    id: '4',
    title: 'Driver on wrong route',
    icon: 'routes',
  },
  {
    id: '5',
    title: 'Ambulance arrived early',
    icon: 'clock-alert-outline',
  },
  {
    id: '6',
    title: 'Other',
    icon: 'help-circle-outline',
  },
];

type Props = NativeStackScreenProps<DrawerStackParamList, 'Booking'>;
const tripStatusToStep = {
  SEARCHING: 'Searching',
  ASSIGNED: 'Driver Assigned',
  ARRIVED: 'Driver Arrived',
  WAITING: 'Waiting',
  STARTED: 'Tracking',
  COMPLETED: 'Ride Completed',
  PAID: 'Ride Completed',
  CANCELLED: 'Cancelled',
};
const BookingScreen = ({ navigation }: Props) => {
  const bottomSheetRef = useRef<Modalize>(null);
  const [isMapLocked, setIsMapLocked] = useState(false);
  const isFocused = useIsFocused();
  const [showSearch, setShowSearch] = useState(true);
  const { currentLocation } = useLocationStore();
  const {
    driverLocation,
    getStatus: getTripStatus,
    getEstimate,
    getOnlineDriversList,
    drivers: nearbyDrivers,
    handleCreateBooking,
    stopSearching,
    handleBookingCancel,
    setDriverLocation,
  } = useBooking();
  const { getLocationWithName } = useLocation();
  const bookingStep = useBookingStore(s => s.bookingStep);
  const setTrip = useBookingStore(s => s.setTrip);
  const trip = useBookingStore(s => s.trip);

  const pickupLocation = useBookingStore(s => s.pickupLocation);
  const destinationLocation = useBookingStore(s => s.destinationLocation);
  const selectedAmbulance = useBookingStore(s => s.selectedAmbulance);
  const setPickupLocation = useBookingStore(s => s.setPickupLocation);
  const setDestinationLocation = useBookingStore(s => s.setDestinationLocation);
  const setSelectedAmbulance = useBookingStore(s => s.setSelectedAmbulance);
  const setStep = useBookingStore(s => s.setStep);
  const [region, setRegion] = useState<Region>({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selected, setSelected] = useState({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [estimate, setEstimate] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (trip?.status === 'SEARCHING') {
        getOnlineDriversList(trip?.ambulanceType, trip?.pickupLocation);
      }
      setTimeout(() => {
        bottomSheetRef.current?.open();
      }, 100);
    }, []), // Keep this array empty
  );

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
  const handleShowAlert = () => {
    showAlert(async () => {
      await handleBookingCancel();
      navigation?.goBack();
    }, 'Do you want to stop search?');
  };

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
  }, [pickupLocation, destinationLocation, selectedAmbulance]);

  const renderSheetContent = () => {
    switch (bookingStep) {
      case 'PICKUP':
        return (
          <LocationSheet
            pickupLocation={pickupLocation}
            currentStep={bookingStep}
            showSearch={showSearch}
            onCurrentLocationPress={() => {
              if (!currentLocation) return;
              setPickupLocation(currentLocation);
              setStep('DESTINATION');
            }}
            onPressChangeonMap={() => {
              Keyboard.dismiss();
              setShowSearch(false);

              setTimeout(() => {
                bottomSheetRef.current?.close();
              }, 100);
            }}
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
            showSearch={showSearch}
            destinationLocation={destinationLocation}
            currentStep={bookingStep}
            onSelectLocation={getEstimatedData}
            onPressChangeonMap={() => {
              Keyboard.dismiss();
              setShowSearch(false);

              setTimeout(() => {
                bottomSheetRef.current?.close();
              }, 100);
            }}
          />
        );

      // case 'Pickup Again':
      //   return (
      //     <LocationSheet
      //       title="Pick Up Location"
      //       subtitle="Select pickup location"
      //       currentLocation={pickupLocation}
      //       currentLocation={destinationLocation}
      //       currentStep={bookingStep}
      //       onSelectLocation={location => {
      //         setDestinationLocation(location);
      //         setStep('');
      //       }}
      //     />
      //   );

      case 'TRIP':
        return (
          <TripDetailsSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            bookingData={{ ...estimate, drivers: nearbyDrivers }}
            selectedAmbulance={selectedAmbulance}
            pickupLocation={pickupLocation?.placeName}
            destinationLocation={destinationLocation?.placeName}
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
            destination={destinationLocation}
            pickupLocation={pickupLocation}
            onCancel={handleRideCancel}
            trip={trip}
          />
        );

      case 'WAITING':
        return (
          <DriverAssignedSheet
            destination={destinationLocation}
            pickupLocation={pickupLocation}
            trip={trip}
          />
        );

      case 'STARTED':
        return (
          <DriverAssignedSheet
            destination={destinationLocation}
            pickupLocation={pickupLocation}
            trip={trip}
          />
        );

      case 'COMPLETED':
        return (
          <RideCompletedSheet
            ambulanceType={selectedAmbulance}
            fare="Rs. 2500"
            distance="12 km"
            duration="35 mins"
            vehicleNumber="ABC-123"
            paymentMethod="Cash"
            pickupLocation={pickupLocation?.address}
            destinationLocation={destinationLocation?.address}
            onSubmitReview={() => {}}
            driverData={{
              driverImage: require('../../../../assets/images/pngs/Mortuary.png'),
              driverName: 'Ahmed Khan',
              driverRating: 4.8,
            }}
          />
        );

      case 'CANCELLED':
        return (
          <CancelRideBottomSheet
            onKeepBooking={() => setStep(trip?.status)}
            reasons={reasons}
            onCancelBooking={handleBookingCancel}
          />
        );
      default:
        return null;
    }
  };

  const onConfirmPickUp = async () => {
    let location = await getLocationWithName(
      selected?.latitude,
      selected?.longitude,
    );
    if (location) {
      await setPickupLocation(location);
      setShowSearch(true);

      bottomSheetRef.current?.open();
    }
  };

  const onConfirmDestination = async () => {
    let location = await getLocationWithName(
      selected?.latitude,
      selected?.longitude,
    );
    if (location) {
      await setDestinationLocation(location);
      setShowSearch(true);

      bottomSheetRef.current?.open();
    }
  };

  // useEffect(() => {
  //   if (!trip?.id && bookingStep !== 'ASSIGNED') return;
  //   let i = 1;
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await getTripStatus();
  //       if (!response) return;

  //       setTrip(response);

  //       setStep(tripStatusToStep[response?.status]);
  //       i = i + 1;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 3000 + i * 1000);

  //   return () => clearInterval(interval);
  // }, [trip?.id]);

  // useEffect(() => {
  //   socket.on('driver_location_changed', location => {
  //     setDriverLocation({
  //       latitude: location.lat,
  //       longitude: location.lng,
  //       name: '',
  //     });
  //   });

  //   return () => {
  //     socket.off('driver_location_changed');
  //   };
  // }, []);

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
          onPress={
            bookingStep === 'PICKUP' ? onConfirmPickUp : onConfirmDestination
          }
        />
      </BaseMap>
      {/* 
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        onChange={handleSheetChanges}
        snapPoints={['50%', '60%', '90%']}
        enableDynamicSizing={true}
        keyboardBlurBehavior="restore"
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustResize"
        // enablePanDownToClose={false}
      > */}
      <Modalize
        ref={bottomSheetRef}
        modalHeight={screenHeight - verticalScale(100)}
        keyboardAvoidingBehavior={
          Platform.OS === 'android' ? 'height' : 'padding'
        }
        panGestureEnabled={false}
        closeOnOverlayTap={false}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'handled',
        }}
      >
        {renderSheetContent()}
      </Modalize>
      {/* </BottomSheet> */}
    </View>
  );
};

export default BookingScreen;
