import React, { FC } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Pressable, Text, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import { useAuth } from '../hooks/useAuth';
import theme from '../styles/theme';
import AppButton from './AppButton';

const DRAWER_ITEMS = [
  { route: 'Home', label: 'Home', icon: 'home' },
  { route: 'RideHistory', label: 'Ride History', icon: 'history' },
  { route: 'Hospitals', label: 'Hospitals', icon: 'local-hospital' },
  { route: 'Notifications', label: 'Notifications', icon: 'notifications' },
  { route: 'Profile', label: 'Profile', icon: 'person' },
  { route: 'HelpSupport', label: 'Help & Support', icon: 'help-outline' },
];

const CustomDrawerContent: FC<any> = props => {
  const styles = useGlobalStyles();
  const { clearToken } = useAuth();
  const activeRoute = props.state.routeNames[props.state.index];

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
        <View style={[styles.listItem, styles.border]}>
          <Text style={[styles.h4, styles.white]}>DA</Text>
        </View>
        <View>
          <Text style={[styles.h4, styles.white]}>Dr. Ashraf</Text>
          <Text style={[styles.h5, styles.white]}>+92 300 0000000</Text>
        </View>
      </View>

      {DRAWER_ITEMS.map(item => {
        const isActive = activeRoute === item.route;
        return (
          <Pressable
            key={item.route}
            onPress={() => props.navigation.navigate(item.route)}
            style={[styles.listItem, isActive && styles.opacitylow]}
            android_ripple={{ color: '#00000005' }}
          >
            <MaterialDesignIcons
              name={item.icon}
              size={22}
              color={isActive ? theme.colors.dark : theme.colors.common.primary}
            />
            <Text style={[globalStyles.mL10, styles.text, styles.white]}>
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
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
