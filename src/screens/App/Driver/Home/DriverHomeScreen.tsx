import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useCallback, useEffect, type FC } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import HomeHeader from '../../../../components/home/header';
import { useDriverStore } from '../../../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import theme from '../../../../styles/theme';
import IncomingRequestSheet from '../../../../components/driver/IncomingRequestSheet';
import NavigateToPickupSheet from '../../../../components/driver/NavigateToPickupSheet';
import TripInProgressSheet from '../../../../components/driver/TripInProgressSheet';
import TripCompletedSheet from '../../../../components/driver/TripCompletedSheet';
import { useThemeStore } from '../../../../stores/themeStore';
import { useAuthStore } from '../../../../stores/authStore';
import { useLocation } from '../../../../hooks/useLocation';
import OnlineToggle from '../../../../components/driver/OnlineToggle';
import InfoCard from '../../../../components/booking/InfoCard';
import { useDriverTracking } from '../../../../hooks/useDriverTracking';
import { useDriver, useDriverDashboard } from '../../../../hooks/useDriver';
import { ambulanceImages } from '../../../../utils/constants';
import DashboardComp from '../../../../components/driver/DashboardComp';
import ActiveTripComp from '../../../../components/driver/ActiveTrip';
import HomeMapComp from '../../../../components/driver/HomeMapComp';
import { useLocationStore } from '../../../../stores/locationStore';

type Props = {
  navigation: any;
};

const DriverHomeScreen: FC<Props> = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const userData = useAuthStore(state => state.userData);

  const data = useDriver(userData?.driverId);
  const {
    isOnline,
    toggleOnline,
    tripStep,
    setCurrentTrip,
    incomingRequest,
    setIsOnline,
    setTripStep,
  } = useDriverStore();

  // console.log(data, userData, incomingRequest, 'k');

  const { currentLocation } = useLocationStore();
  useDriverTracking(userData?.driverId, isOnline);
  const stats = useDriverDashboard(userData?.driverId);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);
  // console.log(currentLocation, userData, isOnline, 'cur');
  // useEffect(() => {
  //   fetchLocation();
  // }, []);

  useEffect(() => {
    if (stats?.activeTrip) {
      setTripStep('navigate_to_pickup');
      setCurrentTrip(stats?.activeTrip);
    }
  }, [stats]);

  useEffect(() => {
    if (data?.isOnline !== undefined) {
      setIsOnline(data.isOnline);
    }
  }, [data?.isOnline]);

  const navigateToEarnings = useCallback(() => {
    navigation.navigate('Earnings');
  }, [navigation]);
  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
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
            activeTrip={stats?.activeTrip}
            onPressDetails={() => navigation.navigate('Booking')}
            onStartTrip={() => console.log('start')}
            onArrived={() => console.log('arrived/accept')}
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
          value={`${data?.rating}★`}
        />

        {/* Stats Row - Today's Earnings & Completed Trips */}
        <DashboardComp
          navigateToEarnings={navigateToEarnings}
          todayEarnings={stats?.todayEarnings}
          completedTrips={stats?.completedTripsToday}
        />

        {/* Live Map Placeholder */}

        <View style={[globalStyles.flex, globalStyles.height200]}>
          <HomeMapComp />
        </View>
      </ScrollView>

      <IncomingRequestSheet />
    </View>
  );
};

export default DriverHomeScreen;
