import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import CustomDrawerContent from '../components/CustomDrawer';
import DrawerPlaceholder from '../screens/DrawerPlaceholder';
import HomeScreen from '../screens/App/Home/Home';
import BookingScreen from '../screens/App/Booking/BookingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideHistoryScreen from '../screens/App/History/RideHistoryScreen';
import RideDetailScreen from '../screens/App/History/RideDetailScreen';

export type DrawerStackParamList = {
  Home: undefined;
  BookingScreen: undefined;
  RideHistory: undefined;
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

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{ headerShown: false, drawerType: 'slide' }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="BookingScreen" component={BookingScreen} />
      <Drawer.Screen name="RideHistory" component={RideStack} />
      <Drawer.Screen
        name="Hospitals"
        component={DrawerPlaceholder}
        initialParams={{ title: 'Hospitals' }}
      />
      <Drawer.Screen
        name="Notifications"
        component={DrawerPlaceholder}
        initialParams={{ title: 'Notifications' }}
      />
      <Drawer.Screen
        name="Profile"
        component={DrawerPlaceholder}
        initialParams={{ title: 'Profile' }}
      />

      <Drawer.Screen
        name="HelpSupport"
        component={DrawerPlaceholder}
        initialParams={{ title: 'Help & Support' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
