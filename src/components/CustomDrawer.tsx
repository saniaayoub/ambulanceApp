import React, { FC } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Pressable, Text, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import { useAuth } from '../hooks/useAuth';
import theme from '../styles/theme';
import AppButton from './AppButton';
import { moderateScale } from 'react-native-size-matters';
import { useAuthStore } from '../stores/authStore';
import { Roles } from '../utils/enums';

const CustomDrawerContent: FC<any> = props => {
  const styles = useGlobalStyles();
  const { logout } = useAuth();
  const { userData } = useAuthStore();

  const activeRoute = props.state.routeNames[props.state.index];
  const DRAWER_ITEMS = [
    { route: 'Home', label: 'Home', icon: 'home' },
    { route: 'RideHistory', label: 'Ride History', icon: 'history' },

    ...(userData?.role === Roles.DRIVER
      ? [{ route: 'Earnings', label: 'Earnings', icon: 'cash' }]
      : []),

    ...(userData?.role === Roles.USER
      ? [{ route: 'Hospitals', label: 'Hospitals', icon: 'hospital' }]
      : []),

    { route: 'Notifications', label: 'Notifications', icon: 'bell' },
    { route: 'Profile', label: 'Profile', icon: 'face-man-profile' },
    { route: 'HelpSupport', label: 'Help & Support', icon: 'phone' },
  ];
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        globalStyles.flex,
        styles.buttonCard,
        globalStyles.padding20,
      ]}
    >
      <View
        style={[globalStyles.row, globalStyles.alignCenter, globalStyles.mV20]}
      >
        <View style={[styles.listItem, globalStyles.mR20, styles.border]}>
          <Text style={[styles.h4, styles.white]}>DA</Text>
        </View>
        <View>
          <Text style={[styles.h4, styles.white]}>{userData?.fullName}</Text>
          <Text style={[styles.h5, styles.white]}>{userData?.phone}</Text>
        </View>
      </View>

      {DRAWER_ITEMS.map(item => {
        const isActive = activeRoute === item.route;
        return (
          <Pressable
            key={item.route}
            onPress={() => props.navigation.navigate(item.route)}
            style={[
              styles.listItem,
              isActive ? styles.border : styles.opacitylow,
            ]}
            android_ripple={{ color: theme.colors.common.white }}
          >
            <MaterialDesignIcons
              name={item.icon}
              size={moderateScale(20)}
              color={theme.colors.common.white}
            />
            <Text
              style={[
                globalStyles.mL10,
                styles.text,
                styles.white,
                !isActive && styles.opacitylow,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}

      <View style={styles.separator} />
      <AppButton
        title="Logout"
        icon={'logout'}
        style={globalStyles.flexStart}
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
