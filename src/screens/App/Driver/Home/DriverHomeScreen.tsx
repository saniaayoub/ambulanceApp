import React, { useCallback, useEffect, type FC } from 'react';
import { ScrollView, View } from 'react-native';
import InfoCard from '../../../../components/booking/InfoCard';
import ActiveTripComp from '../../../../components/driver/ActiveTrip';
import DashboardComp from '../../../../components/driver/DashboardComp';
import HomeMapComp from '../../../../components/driver/HomeMapComp';
import IncomingRequestSheet from '../../../../components/driver/IncomingRequestSheet';
import OnlineToggle from '../../../../components/driver/OnlineToggle';
import HomeHeader from '../../../../components/home/header';
import { useDriver, useDriverDashboard } from '../../../../hooks/useDriver';
import { useDriverTracking } from '../../../../hooks/useDriverTracking';
import { useAuthStore } from '../../../../stores/authStore';
import { useDriverStore } from '../../../../stores/driverStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { ambulanceImages } from '../../../../utils/constants';
import useDriverTrips from '../../../../hooks/useDriverTrips';
import FullScreenLoader from '../../../../components/FullScreenLoader';

type Props = {
  navigation: any;
};

const DriverHomeScreen: FC<Props> = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const userData = useAuthStore(state => state.userData);
  const { data, isLoading } = useDriver(userData?.driverId);
  const { isOnline, toggleOnline, setCurrentTrip, setIsOnline, setTripStep } =
    useDriverStore();
  const currentLocation = useLocationStore(state => state.currentLocation);
  useDriverTracking(userData?.driverId, isOnline);
  const { data: stats, isLoading: isLoadingStats } = useDriverDashboard(
    userData?.driverId,
  );
  const { arrived } = useDriverTrips();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  useEffect(() => {
    if (stats?.activeTrip) {
      const status = stats?.activeTrip?.status;

      setTripStep(status);
      setCurrentTrip(stats?.activeTrip);
    }
  }, [stats]);

  useEffect(() => {
    if (data?.isOnline !== undefined) {
      setIsOnline(data.isOnline);
    }
  }, [data?.isOnline]);

  const navigateToEarnings = () => {
    navigation.navigate('Earnings');
  };

  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <FullScreenLoader loading={isLoading || isLoadingStats} />

      <HomeHeader
        onOpenMenu={openDrawer}
        name={userData?.fullName}
        locationLabel={currentLocation?.placeName}
        role={userData?.role}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Online/Offline Toggle */}
        {stats?.activeTrip ? (
          <ActiveTripComp
            driverLoc={currentLocation}
            activeTrip={stats?.activeTrip}
            onPressDetails={() => navigation.navigate('Booking')}
            onStartTrip={() => console.log('start')}
            onArrived={() => arrived(stats.activeTrip?._id)}
          />
        ) : (
          <OnlineToggle isOnline={isOnline} toggleOnline={toggleOnline} />
        )}
        {/* <OnlineToggle isOnline={isOnline} toggleOnline={toggleOnline} /> */}

        {/* Driver Profile Card */}
        <InfoCard
          name={userData?.ambulanceType}
          image={ambulanceImages[userData?.ambulanceType]}
          text={data?.vehicleNumber}
          label={'Rating'}
          value={`${data?.rating}★`}
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

      <IncomingRequestSheet />
    </View>
  );
};

export default DriverHomeScreen;
