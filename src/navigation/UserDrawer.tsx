import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import CustomDrawerContent from '../components/CustomDrawer';
import DrawerPlaceholder from '../screens/DrawerPlaceholder';
import HomeScreen from '../screens/App/User/Home/Home';
import BookingScreen from '../screens/App/User/Booking/BookingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideHistoryScreen from '../screens/App/Shared/History/RideHistoryScreen';
import RideDetailScreen from '../screens/App/Shared/History/RideDetailScreen';
import Notifications from '../screens/App/Shared/Notifications';
import HospitalsScreen from '../screens/App/User/Hospital';
import ProfileSettings from '../screens/App/Shared/ProfileSettings';

export type DrawerStackParamList = {
  Home: undefined;
  BookingScreen: undefined;
  RideHistory: undefined;
  Notifications: undefined;
  Hospitals: undefined;
  Profile: undefined;
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

const UserDrawer: FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{ headerShown: false, drawerType: 'slide' }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="BookingScreen" component={BookingScreen} />
      <Drawer.Screen name="RideHistory" component={RideStack} />
      <Drawer.Screen name="Hospitals" component={HospitalsScreen} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Profile" component={ProfileSettings} />
      <Drawer.Screen name="HelpSupport" component={DrawerPlaceholder} />
    </Drawer.Navigator>
  );
};

export default UserDrawer;
