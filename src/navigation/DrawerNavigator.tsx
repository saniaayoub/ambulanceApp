import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { FC } from 'react';
import CustomDrawerContent from '../components/CustomDrawer';
import DrawerPlaceholder from '../screens/DrawerPlaceholder';
import HomeScreen from '../screens/App/Home/Home';
import BookingScreen from '../screens/App/Booking/BookingScreen';

const Drawer = createDrawerNavigator();
export type DrawerStackParamList = {
  Home: undefined;
  Booking: undefined;
};

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{ headerShown: false, drawerType: 'slide' }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="BookingScreen" component={BookingScreen} />
      <Drawer.Screen
        name="RideHistory"
        component={DrawerPlaceholder}
        initialParams={{ title: 'Ride History' }}
      />
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
        name="BecomePartner"
        component={DrawerPlaceholder}
        initialParams={{ title: 'Become Partner' }}
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
