import React, { useCallback, useEffect, useRef, type FC } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { verticalScale } from 'react-native-size-matters';
import AppButton from '../../../../components/AppButton';
import AmbulanceCategories from '../../../../components/booking/AmbulanceCategories';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import RideCompletedSheet from '../../../../components/booking/RideCompletedSheet';
import ActiveTripUser from '../../../../components/home/ActiveTripUser';
import HomeHeader from '../../../../components/home/header';
import HospitalsList from '../../../../components/home/HospitalsList';
import { useBooking } from '../../../../hooks/useBooking';
import { useHomeData, useHospitalsData } from '../../../../hooks/useHomeData';
import { useHospitalActions } from '../../../../hooks/useHospitalActions';
import { useLocation } from '../../../../hooks/useLocation';
import { toastError } from '../../../../services/toast';
import { useAuthStore } from '../../../../stores/authStore';
import { useBookingStore } from '../../../../stores/bookingStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { reasons_user } from '../../../../utils/constants';
import { showAlert } from '../../../../utils/functions';
import BottomSheet from '../../../../components/BottomSheet';

const Home: FC = ({ navigation }: any) => {
  const bottomSheetRef = useRef<Modalize>(null);

  const { startHospitalBooking } = useHospitalActions(navigation);
  const styles = useGlobalStyles();
  const {
    selectedAmbulance,
    setSelectedAmbulance,
    setPickupLocation,
    setDestinationLocation,
    startBooking,
    setTrip,
    setStep,
    destinationLocation,
  } = useBookingStore();

  const { stopSearching, submitReviewHandler, handleBookingCancel } =
    useBooking();
  const { userData } = useAuthStore();
  const { currentLocation } = useLocationStore();
  const { fetchCurrentLocation } = useLocation();
  const { data: homeData, isLoading: isHomeLoading } = useHomeData(
    currentLocation?.latitude,
    currentLocation?.longitude,
  );
  const { data: hospitalsData } = useHospitalsData(
    currentLocation?.latitude,
    currentLocation?.longitude,
  );
  const nearbyHospitals = hospitalsData?.data || [];

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (homeData?.activeTrip) {
      setTrip(homeData?.activeTrip);
      setStep(homeData?.activeTrip?.status);
      if (homeData?.activeTrip?.status === 'COMPLETED') {
        bottomSheetRef?.current?.open();
      }
    }
  }, [homeData, setTrip, setStep]);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleRequestAmbulance = () => {
    if (homeData?.activeTrip) {
      toastError('Already in the ride');
      return;
    }
    startBooking();
    setPickupLocation(currentLocation!);
    setDestinationLocation(destinationLocation);

    navigation.navigate('BookingScreen');
  };

  const handleLocationSelect = () => {
    navigation.navigate('LocationScreen', { mode: 'currentLoc' });
  };

  const handleNavigateToHospital = useCallback(() => {
    navigation.navigate('Hospitals');
  }, [navigation]);

  const handleNavigateToBooking = useCallback(() => {
    navigation.navigate('BookingScreen');
  }, [navigation]);

  const showCancelAlert = useCallback(() => {
    showAlert(async () => {
      bottomSheetRef?.current?.open();
    }, 'Are you sure you want to cancel this ride?');
  }, [bottomSheetRef]);

  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <HomeHeader
        onOpenMenu={openDrawer}
        name={userData?.fullName}
        locationLabel={currentLocation?.placeName}
        handleLocationPress={handleLocationSelect}
      />

      {homeData?.activeTrip ? (
        <ActiveTripUser
          driverLoc={homeData?.activeTrip?.driverLocation}
          activeTrip={homeData?.activeTrip}
          onPressDetails={handleNavigateToBooking}
          stopSearching={() => stopSearching('fromHome')}
          onCancelTrip={showCancelAlert}
        />
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={[styles.h4, styles.white, globalStyles.mB10]}>
            Emergency medical transport
          </Text>
          <Text style={[[styles.lightText, styles.white, globalStyles.mB10]]}>
            Book a premium ambulance with trained staff and real-time support.
          </Text>
          <Pressable style={styles.bannerbutton} onPress={() => {}}>
            <Text style={styles.h5}>Emergency SOS</Text>
          </Pressable>
        </View>

        <View style={[globalStyles.mV10]}>
          <Text style={styles.h4}>Ambulance types</Text>
          {/* <Text style={styles.homeSectionAction}>View all</Text> */}
        </View>

        <AmbulanceCategories
          setSelectedAmbulance={setSelectedAmbulance}
          selectedAmbulance={selectedAmbulance}
          data={homeData}
          isLoading={isHomeLoading}
        />
        <AppButton title="Request Ambulance" onPress={handleRequestAmbulance} />
        <View
          style={[
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.justifyBetween,
            globalStyles.mB10,
          ]}
        >
          <Text style={styles.h5}>Nearby hospitals</Text>
          <TouchableOpacity onPress={handleNavigateToHospital}>
            <Text style={[styles.h6, styles.link]}>See All</Text>
          </TouchableOpacity>
        </View>
        <HospitalsList
          nearbyHospitals={nearbyHospitals}
          startHospitalBooking={startHospitalBooking}
        />
      </ScrollView>
      {/* 
      <View style={styles.fabContainer}>
        <Pressable
          style={[styles.fabButton, styles.link]}
          onPress={() => {}}
          accessibilityLabel="Call Helpline"
        >
          <MaterialIcons name={'phone'} size={24} color={'#FFFFFF'} />
        </Pressable>
        <Pressable
          style={[styles.fabButton, styles.link]}
          onPress={() => {}}
          accessibilityLabel="SOS"
        >
          <Text style={[styles.text, { color: theme.colors.common.white }]}>
            SOS
          </Text>
        </Pressable>
      </View> */}

      <BottomSheet bottomSheetRef={bottomSheetRef}>
        {homeData?.activeTrip?.status === 'COMPLETED' ? (
          <RideCompletedSheet
            trip={homeData?.activeTrip}
            onSubmitReview={payload =>
              submitReviewHandler(payload, bottomSheetRef)
            }
          />
        ) : (
          <CancelRideBottomSheet
            onKeepBooking={() => bottomSheetRef?.current?.close()}
            reasons={reasons_user}
            onCancelBooking={reason => {
              handleBookingCancel(reason, () =>
                bottomSheetRef.current?.close(),
              );
            }}
          />
        )}
      </BottomSheet>
    </View>
  );
};

export default Home;
