import React, { useCallback, useEffect, useRef, type FC } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../../../../components/AppButton';
import AmbulanceCategories from '../../../../components/booking/AmbulanceCategories';
import HomeHeader from '../../../../components/home/header';
import HospitalsList from '../../../../components/home/HospitalsList';
import { useHomeData, useHospitalsData } from '../../../../hooks/useHomeData';
import { useHospitalActions } from '../../../../hooks/useHospitalActions';
import { useLocation } from '../../../../hooks/useLocation';
import { useAuthStore } from '../../../../stores/authStore';
import { useBookingStore } from '../../../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { useLocationStore } from '../../../../stores/locationStore';
import ActiveTripUser from '../../../../components/home/ActiveTripUser';
import { useBooking } from '../../../../hooks/useBooking';
import CancelRideBottomSheet from '../../../../components/booking/CancelRideBottomSheet';
import { reasons_user } from '../../../../utils/constants';
import { Modalize } from 'react-native-modalize';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { showAlert } from '../../../../utils/functions';
import { toastError } from '../../../../services/toast';

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

  const { stopSearching, handleBookingCancel } = useBooking();
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
    }
  }, [homeData]);

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

  const handleNavigateToHospital = () => {
    navigation.navigate('Hospitals');
  };

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

      <Modalize
        ref={bottomSheetRef}
        modalHeight={verticalScale(620)}
        keyboardAvoidingBehavior={
          Platform.OS === 'android' ? 'height' : 'padding'
        }
        closeOnOverlayTap={false}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'handled',
        }}
      >
        <CancelRideBottomSheet
          onKeepBooking={() => bottomSheetRef?.current?.close()}
          reasons={reasons_user}
          onCancelBooking={reason => {
            handleBookingCancel(reason, () => bottomSheetRef.current?.close());
          }}
        />
      </Modalize>
    </View>
  );
};

export default Home;
