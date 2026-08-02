import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Keyboard, View } from 'react-native';
import { Region } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
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
import { useBookingStore } from '../../../../stores/bookingStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles } from '../../../../styles/globalStyles';
import { reasons_user, screenHeight } from '../../../../utils/constants';
import { showAlert } from '../../../../utils/functions';

const BookingScreen = ({ navigation }: any) => {
  const bottomSheetRef = useRef<Modalize>(null);
  const { currentLocation } = useLocationStore();
  const [isOpen, setIsOpen] = useState(true);
  const {
    getEstimate,
    getOnlineDriversList,
    drivers: nearbyDrivers,
    handleCreateBooking,
    stopSearching,
    handleBookingCancel,
    submitReviewHandler,
  } = useBooking();

  const [selectedLocation, setSelectedLocation] =
    useState<any>(currentLocation);

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
      setSelectedLocation(pickupLocation);
      setRegion({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      if (trip?.status === 'SEARCHING') {
        getOnlineDriversList(trip?.ambulanceType, trip?.pickupLocation);
      }

      requestAnimationFrame(() => {
        bottomSheetRef.current?.open();
        setIsOpen(true);
      });
    }, []), // Keep this array empty
  );

  useEffect(() => {
    let timeout;
    if (bookingStep === 'PICKUP' || bookingStep === 'DROP OFF') {
      timeout = setTimeout(() => {
        bottomSheetRef?.current?.open();
        setIsOpen(true);
      }, 100);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [bookingStep]);

  const handleRegionChangeComplete = async (region: Region) => {
    if (!isOpen && (bookingStep === 'PICKUP' || bookingStep === 'DROP OFF')) {
      setSelected(region);

      const location = await getLocationWithName(
        region.latitude,
        region.longitude,
      );
      if (location) {
        setSelectedLocation(location);
      }
    }
  };
  const markers = useMemo(
    () => [
      ...(pickupLocation || trip?.pickupLocation
        ? [
            {
              id: 'pickup',
              latitude: trip?.pickupLocation?.lat ?? pickupLocation?.latitude,
              longitude: trip?.pickupLocation?.lng ?? pickupLocation?.longitude,
              type: 'pickup' as const,
            },
          ]
        : []),

      ...(destinationLocation || trip?.destination
        ? [
            {
              id: 'destination',
              latitude: trip?.destination?.lat ?? destinationLocation?.latitude,
              longitude:
                trip?.destination?.lng ?? destinationLocation?.longitude,
              type: 'destination' as const,
            },
          ]
        : []),

      ...(driverTracking || trip?.driverId?.currentLocation
        ? [
            {
              id: 'driver',
              latitude:
                driverTracking?.lat ?? trip?.driverId?.currentLocation?.lat,
              longitude:
                driverTracking?.lng ?? trip?.driverId?.currentLocation?.lng,
              type: 'driver' as const,
            },
          ]
        : []),

      ...(bookingStep === 'SEARCHING' || bookingStep === 'TRIP'
        ? nearbyDrivers.map((item: any) => ({
            id: 'nearbydriver', // or any unique value
            latitude: item?.currentLocation?.lat,
            longitude: item?.currentLocation?.lng,
            type: 'nearbydriver' as const,
          }))
        : []),
    ],
    [
      pickupLocation,
      destinationLocation,
      driverTracking,
      trip,
      bookingStep,
      nearbyDrivers,
    ],
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
      setIsOpen(false);
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
              setStep('DROP OFF');
            }}
            onPressChangeonMap={changeLocationOnMap}
            onSelectLocation={() => {
              setStep('DROP OFF');
            }}
          />
        );

      case 'DROP OFF':
        return (
          <LocationSheet
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
            currentStep={bookingStep}
            onSelectLocation={fetchDrivers}
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
            setSelectedAmbulance={ambulance => {
              setSelectedAmbulance(ambulance);
              fetchDrivers(ambulance?.type);
            }}
            onBack={() => {
              setTimeout(() => {
                bottomSheetRef?.current?.open();
                setIsOpen(true);
              }, 100);
            }}
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
            navigation={navigation}
          />
        );

      case 'WAITING':
        return (
          <DriverAssignedSheet
            trip={trip}
            onCancel={handleRideCancel}
            tracking={driverTracking?.tracking}
            navigation={navigation}
          />
        );

      case 'STARTED':
        return (
          <DriverAssignedSheet
            trip={trip}
            tracking={driverTracking?.tracking}
            navigation={navigation}
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

    setIsOpen(true);
    bottomSheetRef.current?.open();
  };

  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      fetchEstimate();
    }
  }, [pickupLocation, destinationLocation, selectedAmbulance]);

  const fetchEstimate = async () => {
    const data = await getEstimate({
      pickupLocation,
      destination: destinationLocation,
      ambulanceType: selectedAmbulance?.type,
    });

    console.log(data, 'estimate');

    if (!data) return;
    setEstimate(data);
  };

  const fetchDrivers = async (ambulanceType?: string) => {
    const ambType = ambulanceType ?? selectedAmbulance?.type;

    await getOnlineDriversList(ambType, pickupLocation);
    setStep('TRIP');
  };

  const showCenterPin = bookingStep === 'PICKUP' || bookingStep === 'DROP OFF';

  const getBookingTitle = (bookingStep: string): string => {
    switch (bookingStep) {
      case 'PICKUP':
      case 'DROP OFF':
      case 'TRIP':
        return 'Booking Ambulance';

      case 'SEARCHING':
        return 'Searching Ambulance';

      default:
        return 'Ongoing Trip';
    }
  };

  const bottomSheetConfig = useMemo(() => {
    switch (bookingStep) {
      case 'PICKUP':
      case 'DROP OFF':
        return {
          modalHeight: screenHeight * 0.85,
          alwaysOpen: screenHeight * 0.85,
          panGestureEnabled: false,
        };

      case 'SEARCHING':
        return {
          modalHeight: screenHeight * 0.8,
          alwaysOpen: screenHeight * 0.2,
          panGestureEnabled: true,
        };

      case 'TRIP':
      case 'ASSIGNED':
      case 'WAITING':
      case 'STARTED':
        return {
          modalHeight: screenHeight * 0.9,
          alwaysOpen: screenHeight * 0.3,
          panGestureEnabled: true,
        };

      default:
        return {
          modalHeight: screenHeight * 0.9,
          alwaysOpen: screenHeight * 0.9,
          panGestureEnabled: false,
        };
    }
  }, [bookingStep]);
  return (
    <View style={globalStyles.flex}>
      <BaseMap
        initialRegion={region}
        markers={markers}
        step={bookingStep}
        title={getBookingTitle(bookingStep)}
        onRegionChangeComplete={handleRegionChangeComplete}
        showCenterPin={showCenterPin}
        location={
          trip?.destination?.address ??
          pickupLocation?.address ??
          selectedLocation?.address
        }
      >
        {bookingStep === 'PICKUP' || bookingStep === 'DROP OFF' ? (
          <AppButton
            title="Confirm Location"
            style={globalStyles.absBottomTxt}
            onPress={onConfirmLocation}
          />
        ) : null}
      </BaseMap>

      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        modalHeight={bottomSheetConfig.modalHeight}
        alwaysOpen={bottomSheetConfig.alwaysOpen}
        panGestureEnabled={bottomSheetConfig.panGestureEnabled}
      >
        {renderSheetContent()}
      </BottomSheet>
    </View>
  );
};

export default BookingScreen;
