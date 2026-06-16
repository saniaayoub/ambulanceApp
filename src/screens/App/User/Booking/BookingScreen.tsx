import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import BaseMap from '../../../../components/map/BaseMap';

import TripDetailsSheet from '../../../../components/booking/TripDetailsSheet';
import DriverAssignedSheet from '../../../../components/booking/DriverAssignedSheet';
import LocationSheet from '../../../../components/booking/LocationSheet';
import RideCompletedSheet from '../../../../components/booking/RideCompletedSheet';
import SearchingSheet from '../../../../components/booking/SearchingSheet';

import { bookingSteps, useBookingData } from '../../../../hooks/useBookingData';
import { DrawerStackParamList } from '../../../../navigation/DriverDrawer';

import { useBookingStore } from '../../../../stores/bookingStore';
import { Location, useLocationStore } from '../../../../stores/locationStore';

import { Region } from 'react-native-maps';
import AppButton from '../../../../components/AppButton';
import { useLocation } from '../../../../hooks/useLocation';
import { globalStyles } from '../../../../styles/globalStyles';

type Props = NativeStackScreenProps<DrawerStackParamList, 'Booking'>;

const BookingScreen = ({ navigation }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { currentLocation } = useLocationStore();
  const { getEstimate } = useBookingData();
  const { getLocationWithName } = useLocation();

  const {
    bookingStep,
    pickupLocation,
    destinationLocation,
    selectedAmbulance,
    setPickupLocation,
    setDestinationLocation,
    setSelectedAmbulance,
    setStep,
  } = useBookingStore();

  const [region, setRegion] = useState<Region>({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selected, setSelected] = useState(region);
  const [estimate, setEstimate] = useState(null);

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

      case 'Pickup Again':
        return (
          <LocationSheet
            title="Pick Up Location"
            subtitle="Select pickup location"
            currentLocation={pickupLocation}
            currentLocation={destinationLocation}
            currentStep={bookingStep}
            onSelectLocation={location => {
              setDestinationLocation(location);
              setStep('');
            }}
          />
        );

      case 'Trip Details':
        return (
          <TripDetailsSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            bookingData={estimate}
            selectedAmbulance={selectedAmbulance}
            pickupLocation={pickupLocation?.name}
            destinationLocation={destinationLocation?.name}
            setSelectedAmbulance={setSelectedAmbulance}
            onNext={async () => {
              let data = await getEstimate({
                pickupLocation: pickupLocation,
                destination: destinationLocation,
                ambulanceType: selectedAmbulance?.type,
              });
              // setStep('Searching')
            }}
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
            nextStep={setStep}
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

  const handleDestinationNext = async (location: Location) => {
    console.log(location, 'dest next');
    setDestinationLocation(location);
    let data = await getEstimate({
      pickupLocation: pickupLocation,
      destination: destinationLocation,
      ambulanceType: selectedAmbulance?.type,
    });
    await setEstimate(data);
    setStep('Trip Details');
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
        onRegionChangeComplete={setSelected}
      >
        <AppButton
          title="Confirm Location"
          style={globalStyles.absBottomTxt}
          onPress={
            bookingStep === 'Pickup' ? onConfirmPickUp : onConfirmDestination
          }
        />
      </BaseMap>
      {/* ) : null} */}

      {/* <BackButton title="Book Ambulance" /> */}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['40%', '60%', '90%']}
        enablePanDownToClose={false}
      >
        {renderSheetContent()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
