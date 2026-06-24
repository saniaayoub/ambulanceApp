import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import CustomDrawerContent from '../components/CustomDrawer';
import DrawerPlaceholder from '../screens/DrawerPlaceholder';
import DriverHomeScreen from '../screens/App/Driver/Home/DriverHomeScreen';
import EarningsScreen from '../screens/App/Driver/Earnings/EarningsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideHistoryScreen from '../screens/App/Shared/History/RideHistoryScreen';
import RideDetailScreen from '../screens/App/Shared/History/RideDetailScreen';
import Notifications from '../screens/App/Shared/Notifications';
import ProfileSettings from '../screens/App/Shared/ProfileSettings';
import BookingScreen from '../screens/App/Driver/Booking/BookingScreen';

export type DrawerStackParamList = {
  Home: undefined;
  Booking: undefined;
  Earnings: undefined;
  RideHistory: undefined;
  Notifications: undefined;
  Profile: undefined;
  HelpSupport: undefined;
};
const Drawer = createDrawerNavigator<DrawerStackParamList>();

const RideStackNavigator = createNativeStackNavigator();

const RideStack = () => {
  return (
    <RideStackNavigator.Navigator
      initialRouteName="RideHistoryScreen"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <RideStackNavigator.Screen
        name={'RideHistoryScreen'}
        component={RideHistoryScreen}
      />
      <RideStackNavigator.Screen
        name={'RideDetailScreen'}
        component={RideDetailScreen}
      />
    </RideStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="Dashboard"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <HomeStackNavigator.Screen
        name={'Dashboard'}
        component={DriverHomeScreen}
      />
      <HomeStackNavigator.Screen name={'Earnings'} component={EarningsScreen} />
    </HomeStackNavigator.Navigator>
  );
};

const DriverDrawer: FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{ headerShown: false, drawerType: 'slide' }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      {/* <Drawer.Screen name="Booking" component={BookingScreen} />
      <Drawer.Screen name="Earnings" component={EarningsScreen} />
      <Drawer.Screen name="RideHistory" component={RideStack} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Profile" component={ProfileSettings} />
      <Drawer.Screen name="HelpSupport" component={DrawerPlaceholder} /> */}
    </Drawer.Navigator>
  );
};

export default DriverDrawer;
