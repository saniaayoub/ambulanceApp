import BottomSheet from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BackButton from '../../../../components/BackButton';
import BaseMap from '../../../../components/map/BaseMap';

import LocationSheet from '../../../../components/booking/PickupLocationSheet';
import BookingBottomSheet from '../../../../components/booking/BookingBottomSheet';
import SearchingSheet from '../../../../components/booking/SearchingSheet';
import DriverAssignedSheet from '../../../../components/booking/DriverAssignedSheet';
import RideCompletedSheet from '../../../../components/booking/RideCompletedSheet';

import { DrawerStackParamList } from '../../../../navigation/DriverDrawer';
import { bookingSteps } from '../../../../hooks/useBookingSheetContent';

import { useBookingStore } from '../../../../stores/bookingStore';
import { useLocationStore } from '../../../../stores/locationStore';

import { globalStyles } from '../../../../styles/globalStyles';
import { Region } from 'react-native-maps';

type Props = NativeStackScreenProps<DrawerStackParamList, 'Booking'>;

const BookingScreen = ({ navigation }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { currentLocation } = useLocationStore();

  const {
    bookingStep,
    pickupLocation,
    destinationLocation,
    selectedAmbulance,
    setPickupLocation,
    setDestinationLocation,
    setSelectedAmbulance,
    advanceStep,
  } = useBookingStore();

  useEffect(() => {
    bottomSheetRef.current?.expand();
    setPickupLocation(currentLocation);
  }, []);

  const [region, setRegion] = useState<Region>({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const nearbyDrivers = [
    {
      id: '1',
      lat: 24.865,
      lng: 67.01,
    },
    {
      id: '2',
      lat: 24.862,
      lng: 67.005,
    },
    {
      id: '3',
      lat: 24.859,
      lng: 67.015,
    },
  ];

  const markers = [
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
      ? nearbyDrivers.map(driver => ({
          id: driver.id,
          latitude: driver.lat,
          longitude: driver.lng,
          type: 'driver' as const,
        }))
      : []),
  ];

  const renderSheetContent = () => {
    switch (bookingStep) {
      case 'Pickup':
        return (
          <LocationSheet
            title="Pick Up Location"
            subtitle="Select pickup location"
            currentLocation={pickupLocation}
            currentStep={bookingStep}
            onSelectLocation={location => {
              setPickupLocation(location);
              advanceStep();
            }}
          />
        );

      case 'Destination':
        return (
          <LocationSheet
            title="Destination"
            subtitle="Select destination"
            currentLocation={destinationLocation}
            currentStep={bookingStep}
            onSelectLocation={location => {
              setDestinationLocation(location);
              advanceStep();
            }}
          />
        );

      case 'Trip Details':
        return (
          <BookingBottomSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            selectedAmbulance={selectedAmbulance}
            pickupLocation={pickupLocation?.address}
            destinationLocation={destinationLocation?.address}
            setSelectedAmbulance={setSelectedAmbulance}
            onAdvance={advanceStep}
          />
        );

      case 'Searching':
        return (
          <SearchingSheet
            nearbyCount={nearbyDrivers.length}
            estimatedTime="10-15 sec"
            currentStep={bookingStep}
            onCancel={() => {}}
          />
        );

      case 'Driver Assigned':
        return (
          <DriverAssignedSheet
            currentStep={bookingStep}
            destination={destinationLocation?.address}
            selectedAmbulance={selectedAmbulance}
            nextStep={advanceStep}
            driverData={{
              driverImage: require('../../../../assets/images/pngs/Mortuary.png'),
              driverName: 'Ahmed Khan',
              driverRating: 4.8,
            }}
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

      default:
        return null;
    }
  };

  const showCenterPin =
    bookingStep === 'Pickup' || bookingStep === 'Destination';

  return (
    <View style={globalStyles.flex}>
      {/* {pickupLocation?.latitude ? ( */}
      <BaseMap
        initialRegion={region}
        markers={markers}
        showCenterPin={showCenterPin}
        title={'Booking Ambulance'}
      />
      {/* ) : null} */}

      {/* <BackButton title="Book Ambulance" /> */}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['35%', '60%', '90%']}
        enablePanDownToClose={false}
      >
        {renderSheetContent()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
