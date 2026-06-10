import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocationSheet from '../../../components/booking/PickupLocationSheet';
import { useBookingStore } from '../../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../../styles/globalStyles';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import BackButton from '../../../components/BackButton';
import BookingBottomSheet from '../../../components/booking/BookingBottomSheet';
import { bookingSteps } from '../../../hooks/useBookingSheetContent';

const BookingScreen = () => {
  const styles = useGlobalStyles();
  const [show, setShow] = useState(true);
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
    bottomSheetRef.current?.expand();
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
            bookingStep={bookingStep}
          />
        );
      case 'Destination':
        return (
          <LocationSheet
            onSelectLocation={handleSelectDestination}
            currentLocation={destinationLocation}
            title="Drop-off location"
            subtitle="Select where you want to be dropped off"
            bookingStep={bookingStep}
          />
        );
      default:
        return (
          <BookingBottomSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            selectedAmbulance="Ventilator Ambulance"
            pickupLocation="here"
            destinationLocation="hhyuy"
            onAdvance={advanceStep}
          />
        );
    }
  };

  //   const showSheet = bookingStep === 'Pickup' || bookingStep === 'Destination';

  return (
    <View style={globalStyles.flex}>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.absoluteFill}
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

      <BackButton title={'Book Ambulance'} />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[200, 400, '70%']}
        enablePanDownToClose={false}
        handleIndicatorStyle={styles.greyCard}
        backgroundStyle={styles.card}
      >
        {renderSheetContent()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
