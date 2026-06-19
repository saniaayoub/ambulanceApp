import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import BaseMap from '../../../../components/map/BaseMap';

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
import { useIsFocused } from '@react-navigation/native';
import { showAlert } from '../../../../utils/functions';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';

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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isMapLocked, setIsMapLocked] = useState(false);
  const isFocused = useIsFocused();

  const { currentLocation } = useLocationStore();
  const {
    getStatus: getTripStatus,
    getEstimate,
    getOnlineDriversList,
    drivers: nearbyDrivers,
    handleCreateBooking,
    handleBookingCancel,
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

      ...(bookingStep === 'Searching'
        ? nearbyDrivers.map((item: any) => ({
            id: item?.user?.phone, // or any unique value
            latitude: item?.driver?.currentLocation?.lat,
            longitude: item?.driver?.currentLocation?.lng,
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
      setStep('Cancelled');
    }, 'Are you sure you want to cancel this ride?');
  };

  const handleSearchStart = async () => {
    await handleCreateBooking(
      pickupLocation,
      destinationLocation,
      selectedAmbulance?.type,
    ).then(() => {
      setStep('Searching');
    });
  };
  const renderSheetContent = () => {
    switch (bookingStep) {
      case 'Pickup':
        return (
          <LocationSheet
            pickupLocation={pickupLocation}
            currentStep={bookingStep}
            onCurrentLocationPress={() => {
              if (!currentLocation) return;
              setPickupLocation(currentLocation);
              setStep('Destination');
            }}
            onPressChangeonMap={() => {
              bottomSheetRef.current?.close();
            }}
            onSelectLocation={location => {
              setPickupLocation(location);
              setStep('Destination');
            }}
          />
        );

      case 'Destination':
        return (
          <LocationSheet
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
            currentStep={bookingStep}
            onSelectLocation={handleDestinationNext}
            onPressChangeonMap={() => {
              bottomSheetRef.current?.close();
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

      case 'Trip Details':
        return (
          <TripDetailsSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            bookingData={{ ...estimate, drivers: nearbyDrivers }}
            selectedAmbulance={selectedAmbulance}
            pickupLocation={pickupLocation?.name}
            destinationLocation={destinationLocation?.name}
            setSelectedAmbulance={setSelectedAmbulance}
            onNext={handleSearchStart}
          />
        );

      case 'Searching':
        return (
          <SearchingSheet
            nearbyCount={nearbyDrivers.length}
            estimatedTime="20-45 sec"
            currentStep={bookingStep}
            onCancel={handleShowAlert}
          />
        );

      case 'Driver Assigned':
        return (
          <DriverAssignedSheet
            destination={destinationLocation}
            pickupLocation={pickupLocation}
            onCancel={handleRideCancel}
            trip={trip}
          />
        );

      case 'Waiting':
        return (
          <DriverAssignedSheet
            destination={destinationLocation}
            pickupLocation={pickupLocation}
            trip={trip}
          />
        );

      case 'Tracking':
        return (
          <DriverAssignedSheet
            destination={destinationLocation}
            pickupLocation={pickupLocation}
            trip={trip}
          />
        );

      case 'Completed':
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

      case 'Cancelled':
        return (
          <CancelRideBottomSheet
            onKeepBooking={() => {
              setStep('Driver Assigned');
            }}
            onCancelBooking={async (reason: string) => {
              console.log('hi');
              await handleBookingCancel(reason);
              navigation.goBack;
            }}
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
      bottomSheetRef.current?.expand();
    }
  };

  const onConfirmDestination = async () => {
    let location = await getLocationWithName(
      selected?.latitude,
      selected?.longitude,
    );
    if (location) {
      await setDestinationLocation(location);
      bottomSheetRef.current?.expand();
    }
  };

  useEffect(() => {
    if (!isFocused) return;

    const loadData = async () => {
      if (bookingStep === 'Trip Details') {
        await getEstimatedData();
        await getOnlineDriversList(selectedAmbulance?.type, pickupLocation);
      }
    };

    loadData();
  }, [isFocused, bookingStep, selectedAmbulance]);

  useEffect(() => {
    if (!trip?.id && bookingStep !== 'Driver Assigned') return;
    let i = 1;
    const interval = setInterval(async () => {
      try {
        const response = await getTripStatus();
        console.log(bookingStep, response, 'k');
        if (!response) return;

        setTrip(response);

        setStep(tripStatusToStep[response?.status]);
        i = i + 1;
      } catch (error) {
        console.log(error);
      }
    }, 3000 + i * 1000);

    return () => clearInterval(interval);
  }, [trip?.id]);

  const getEstimatedData = async () => {
    let data = await getEstimate({
      pickupLocation: pickupLocation,
      destination: destinationLocation,
      ambulanceType: selectedAmbulance?.type,
    });
    setEstimate(data);
  };

  const handleDestinationNext = async (location: Location) => {
    setDestinationLocation(location);

    setStep('Trip Details');
  };

  const showCenterPin =
    bookingStep === 'Pickup' || bookingStep === 'Destination';

  const handleSheetChanges = (index: number) => {
    setIsMapLocked(index === -1);
  };

  return (
    <View style={globalStyles.flex}>
      <BaseMap
        initialRegion={region}
        markers={markers}
        step={bookingStep}
        title={'Booking Ambulance'}
        onRegionChangeComplete={isMapLocked ? () => {} : setSelected}
        // showCenterPin={showCenterPin}
        // selected={selected}
        // onMarkerPress={setSelected}
      >
        <AppButton
          title="Confirm Location"
          style={globalStyles.absBottomTxt}
          onPress={
            bookingStep === 'Pickup' ? onConfirmPickUp : onConfirmDestination
          }
        />
      </BaseMap>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        onChange={handleSheetChanges}
        snapPoints={['40%', '60%', '90%']}
        enablePanDownToClose={false}
      >
        {renderSheetContent()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
