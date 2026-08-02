import React, { useCallback, useEffect, useRef, type FC } from 'react';
import { ScrollView, View } from 'react-native';
import InfoCard from '../../../../components/booking/InfoCard';
import ActiveTripComp from '../../../../components/driver/ActiveTrip';
import DashboardComp from '../../../../components/driver/DashboardComp';
import IncomingRequestSheet from '../../../../components/driver/IncomingRequestSheet';
import OnlineToggle from '../../../../components/driver/OnlineToggle';
import FullScreenLoader from '../../../../components/FullScreenLoader';
import HomeHeader from '../../../../components/home/header';
import { useDriver, useDriverDashboard } from '../../../../hooks/useDriver';
import { useDriverTracking } from '../../../../hooks/useDriverTracking';
import useDriverTrips from '../../../../hooks/useDriverTrips';
import { useAuthStore } from '../../../../stores/authStore';
import { useDriverStore } from '../../../../stores/driverStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { ambulanceImages, screenHeight } from '../../../../utils/constants';
import BottomSheet from '../../../../components/BottomSheet';
import { Modalize } from 'react-native-modalize';

type Props = {
  navigation: any;
};

const DriverHomeScreen: FC<Props> = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<Modalize>(null);

  const userData = useAuthStore(state => state.userData);
  const { data, isLoading } = useDriver(userData?.driverId);
  const {
    incomingRequest,
    isOnline,
    toggleOnline,
    setCurrentTrip,
    setIsOnline,
    setTripStep,
    tripTracking,
  } = useDriverStore();
  const currentLocation = useLocationStore(state => state.currentLocation);
  useDriverTracking(userData?.driverId, isOnline);
  const { data: stats, isLoading: isLoadingStats } = useDriverDashboard(
    userData?.driverId,
  );
  const {
    arrived,
    start: startTrip,
    complete: completeTrip,
    paymentReceived,
  } = useDriverTrips();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  useEffect(() => {
    if (stats?.activeTrip) {
      setTripStep(stats?.activeTrip?.status);
      setCurrentTrip(stats?.activeTrip);
    }
  }, [stats]);

  useEffect(() => {
    if (data?.isOnline !== undefined) {
      setIsOnline(data.isOnline);
    }
  }, [data?.isOnline]);

  useEffect(() => {
    if (incomingRequest) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [incomingRequest]);

  const navigateToEarnings = () => {
    navigation.navigate('Earnings');
  };

  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <FullScreenLoader loading={isLoading || isLoadingStats} />

      <HomeHeader
        onOpenMenu={openDrawer}
        name={data?.fullName}
        locationLabel={currentLocation?.address}
        role={userData?.role}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Online/Offline Toggle */}
        {stats?.activeTrip ? (
          <ActiveTripComp
            tracking={tripTracking ?? {}}
            activeTrip={stats?.activeTrip}
            onPressDetails={() => navigation.navigate('Booking')}
            onStartTrip={() => startTrip(stats.activeTrip?._id)}
            onArrived={() => arrived(stats.activeTrip?._id)}
            onCompleteTrip={() => completeTrip(stats.activeTrip?._id)}
            onPaymentRecieved={() => paymentReceived(stats.activeTrip?._id)}
          />
        ) : (
          <OnlineToggle isOnline={isOnline} toggleOnline={toggleOnline} />
        )}

        {/* Driver Profile Card */}
        <InfoCard
          name={userData?.ambulanceType}
          image={ambulanceImages[userData?.ambulanceType]}
          text={data?.vehicleNumber}
          label={'Rating'}
          value={`${stats?.rating}★`}
        />

        {/* Stats Row - Today's Earnings & Completed Trips */}
        <DashboardComp
          navigateToEarnings={navigateToEarnings}
          todayEarnings={stats?.todayEarnings}
          completedTrips={stats?.completedTripsToday}
        />

        {/* Live Map Placeholder */}
        {/* 
        <View style={[globalStyles.flex, globalStyles.height200]}>
          <HomeMapComp />
        </View> */}
      </ScrollView>
      <BottomSheet
        bottomSheetRef={bottomSheetRef}
        modalHeight={screenHeight * 0.6}
      >
        <IncomingRequestSheet bottomSheetRef={bottomSheetRef} />
      </BottomSheet>
    </View>
  );
};

export default DriverHomeScreen;
