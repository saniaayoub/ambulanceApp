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
import { socket } from '../../../../services/socketService';
type Props = {
  navigation: any;
};

const DriverHomeScreen: FC<Props> = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const userData = useAuthStore(state => state.userData);
  const data = useDriver(userData?.driverId);
  console.log(data, 'k');
  const {
    isOnline,
    toggleOnline,
    tripStep,
    incomingRequest,
    todayEarnings,
    completedTrips,
    setIsOnline,
    setIncomingRequest,
  } = useDriverStore();
  const { fetchLocation, currentLocation } = useLocation();
  const driverhook = useDriverTracking(userData?.driverId, isOnline);
  const stats = useDriverDashboard(userData?.driverId);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  // console.log(userData, 'driver');

  useEffect(() => {
    if (!socket) return;

    const handleIncomingTrip = (tripRequest: any) => {
      console.log('Incoming trip:', tripRequest);

      setIncomingRequest(tripRequest); // zustand
      // setBottomSheetVisible(true);
    };

    const handleRemoveRequest = (tripRequest: any) => {
      if (tripRequest?.tripId === incomingRequest?.tripId) {
        console.log('request removed:', tripRequest);

        setIncomingRequest(null);
      }
    };

    socket.on('incoming_trip_request', handleIncomingTrip);
    socket.on('trip_request_taken', handleRemoveRequest);

    return () => {
      socket.off('incoming_trip_request', handleIncomingTrip);
      socket.off('trip_request_taken', handleRemoveRequest);
    };
  }, [socket]);

  useEffect(() => {
    if (currentLocation) {
      fetchLocation();
    }
  }, []);

  useEffect(() => {
    if (data?.isOnline !== undefined) {
      setIsOnline(data.isOnline);
    }
  }, [data?.isOnline]);

  const navigateToEarnings = useCallback(() => {
    navigation.navigate('Earnings');
  }, [navigation]);

  // // Simulate an incoming request for demo
  // useEffect(() => {
  //   if (isOnline && tripStep === 'idle') {
  //     const timer = setTimeout(
  //       () => {
  //         setIncomingRequest({
  //           pickupLocation: 'Healthy Smile Clinic, Main Boulevard',
  //           destinationHospital: 'Jinnah Hospital, Jail Road',
  //           distance: '8.2 km',
  //           fareEstimate: 'Rs. 2,500',
  //           patientName: 'Muhammad Ali',
  //           patientPhone: '+92 300 1234567',
  //           timestamp: Date.now(),
  //         });
  //       },
  //       isOnline ? 8000 : 999999,
  //     );
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOnline, tripStep, setIncomingRequest]);

  useEffect(() => {
    if (isOnline && tripStep === 'navigate_to_pickup') {
      navigation.navigate('NavigateToPickup');
    }
  }, []);

  // console.log(userData);
  // console.log(userData, 'k');
  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <HomeHeader
        onOpenMenu={openDrawer}
        name={userData?.fullName}
        locationLabel={currentLocation?.name}
        role={userData?.role}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Online/Offline Toggle */}
        {stats?.activeTrip ? (
          <ActiveTripComp
            activeTrip={stats?.activeTrip}
            onPressDetails={() => navigation.navigate('TripDetails')}
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
          value={`${userData?.rating}★`}
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
