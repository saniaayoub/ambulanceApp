import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useRef, useCallback, useEffect } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useBookingStore,
  type BookingStep,
} from '../../../stores/bookingStore';
import BookingTopBar from '../../../components/booking/BookingTopBar';
import BookingStepIndicator from '../../../components/booking/BookingStepIndicator';
import LocationSheet from '../../../components/booking/PickupLocationSheet';
import { globalStyles, useGlobalStyles } from '../../../styles/globalStyles';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import BackButton from '../../../components/BackButton';

const bookingSteps: BookingStep[] = [
  'Pickup',
  'Destination',
  'Ambulance Select',
  'Summary',
  'Searching',
  'Driver Assigned',
  'Tracking',
  'Completed',
];

const BookingScreen = () => {
  const styles = useGlobalStyles();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const {
    bookingStep,
    pickupLocation,
    destinationLocation,
    setPickupLocation,
    setDestinationLocation,
    advanceStep,
  } = useBookingStore();

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 1000);
  }, []);

  const handleSelectPickup = useCallback(
    (location: string) => {
      setPickupLocation(location);
      advanceStep();
    },
    [setPickupLocation, advanceStep],
  );

  const handleSelectDestination = useCallback(
    (location: string) => {
      setDestinationLocation(location);
      advanceStep();
    },
    [setDestinationLocation, advanceStep],
  );

  const renderSheetContent = () => {
    switch (bookingStep) {
      case 'Pickup':
        return (
          <LocationSheet
            onSelectLocation={handleSelectPickup}
            currentLocation={pickupLocation}
            title="Pick up location"
            subtitle="Select where you want to pick up"
          />
        );
      case 'Destination':
        return (
          <LocationSheet
            onSelectLocation={handleSelectDestination}
            currentLocation={destinationLocation}
            title="Drop-off location"
            subtitle="Select where you want to be dropped off"
          />
        );
      default:
        return null;
    }
  };

  //   const showSheet = bookingStep === 'Pickup' || bookingStep === 'Destination';

  return (
    // <GestureHandlerRootView style={globalStyles.flex}>
    //   <SafeAreaView style={globalStyles.flex}>
    <View style={globalStyles.flex}>
      <View style={styles.bookingMapContainer}>
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.bookingMap}
          initialRegion={{
            latitude: 24.7136,
            longitude: 46.6753,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
          }}
        >
          <Marker
            coordinate={{ latitude: 24.7136, longitude: 46.6753 }}
            title="Pickup"
            description={pickupLocation}
          />
        </MapView> */}
        {/* <BookingTopBar
          title="Book Ambulance"
          subtitle={pickupLocation || 'Tap to select location'}
        /> */}
        <BackButton title={'Book Ambulance'} />
        <BookingStepIndicator currentStep={bookingStep} steps={bookingSteps} />

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[200, 400, '70%']}
          enablePanDownToClose={false}
          handleIndicatorStyle={styles.bookingSheetHandleIndicator}
          backgroundStyle={styles.bookingSheetBackground}
        >
          {renderSheetContent()}
        </BottomSheet>
      </View>
    </View>
    //   </SafeAreaView>
    // </GestureHandlerRootView>
  );
};

export default BookingScreen;
