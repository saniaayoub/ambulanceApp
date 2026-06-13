import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocationSheet from '../../../../components/booking/PickupLocationSheet';
import { useBookingStore } from '../../../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import BackButton from '../../../../components/BackButton';
import BookingBottomSheet from '../../../../components/booking/BookingBottomSheet';
import { bookingSteps } from '../../../../hooks/useBookingSheetContent';
import SearchingSheet from '../../../../components/booking/SearchingSheet';
import DriverAssignedSheet from '../../../../components/booking/DriverAssignedSheet';
import { DrawerStackParamList } from '../../../../navigation/DriverDrawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import DriverDetailsSheet from '../../../../components/booking/DriverDetailsSheet';
import RideCompletedSheet from '../../../../components/booking/RideCompletedSheet';
type Props = NativeStackScreenProps<DrawerStackParamList, 'Booking'>;

const BookingScreen = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  // const [show, setShow] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedAmbulance, setSelectedAmbulance } = useBookingStore();
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
            currentStep={bookingStep}
          />
        );
      case 'Destination':
        return (
          <LocationSheet
            onSelectLocation={handleSelectDestination}
            currentLocation={destinationLocation}
            title="Drop-off location"
            subtitle="Select where you want to be dropped off"
            currentStep={bookingStep}
          />
        );
      case 'Trip Details':
        return (
          <BookingBottomSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            selectedAmbulance={selectedAmbulance}
            pickupLocation="here"
            destinationLocation="hhyuy"
            onAdvance={advanceStep}
            setSelectedAmbulance={setSelectedAmbulance}
          />
        );
      case 'Searching':
        return (
          <SearchingSheet
            nearbyCount={3}
            estimatedTime="10 - 15 sec"
            currentStep={bookingStep}
            onCancel={advanceStep}
          />
        );

      case 'Driver Assigned':
        return (
          <DriverAssignedSheet
            driverData={{
              driverImage: require('../../../../assets/images/pngs/Mortuary.png'),
              driverName: 'Sheikh Abdul',
              driverRating: 4,
            }}
            currentStep={bookingStep}
            nextStep={advanceStep}
            destination={destinationLocation}
            selectedAmbulance={selectedAmbulance}
          />
        );

      case 'Cancelled':
        return (
          <RideCompletedSheet
            driverData={{
              driverImage: require('../../../../assets/images/pngs/Mortuary.png'),
              driverName: 'Sheikh Abdul',
              driverRating: 4,
            }}
            ambulanceType={selectedAmbulance}
            distance={'12 km'}
            duration={'1 hour'}
            fare={'Rs. 2000'}
            vehicleNumber={'No.'}
            paymentMethod={'Cash'}
            pickupLocation={'Location'}
            destinationLocation={destinationLocation}
            onSubmitReview={() => {}}
          />
        );

      // case 'Driver Details':
      //   return (
      //     <DriverDetailsSheet
      //       driverData={{
      //         driverImage: require('../../../../assets/images/pngs/Mortuary.png'),
      //         driverName: 'Sheikh Abdul',
      //         driverRating: 4,
      //       }}
      //       selectedAmbulance={selectedAmbulance}
      //     />
      //   );

      // case 'Cancelled':
      //   return (
      //     <CancelRideBottomSheet
      //       onCancelBooking={() => {}}
      //       onKeepBooking={() => {}}
      //     />
      //   );

      default:
        return (
          <BookingBottomSheet
            currentStep={bookingStep}
            steps={bookingSteps}
            selectedAmbulance={selectedAmbulance}
            pickupLocation="here"
            destinationLocation="hhyuy"
            onAdvance={advanceStep}
            setSelectedAmbulance={setSelectedAmbulance}
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
