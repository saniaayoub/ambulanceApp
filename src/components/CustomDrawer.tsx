import React, { FC } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import { useGlobalStyles } from '../styles/globalStyles';
import { useAuth } from '../hooks/useAuth';

const DRAWER_ITEMS = [
  { route: 'Home', label: 'Home', icon: 'home' },
  { route: 'RideHistory', label: 'Ride History', icon: 'history' },
  { route: 'Hospitals', label: 'Hospitals', icon: 'local-hospital' },
  { route: 'Notifications', label: 'Notifications', icon: 'notifications' },
  { route: 'Profile', label: 'Profile', icon: 'person' },
  { route: 'BecomePartner', label: 'Become Partner', icon: 'support-agent' },
  { route: 'HelpSupport', label: 'Help & Support', icon: 'help-outline' },
];

const CustomDrawerContent: FC<any> = props => {
  const styles = useGlobalStyles();
  const { clearToken } = useAuth();
  const activeRoute = props.state.routeNames[props.state.index];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View style={styles.drawerHeaderRow}>
        <View style={styles.drawerAvatar}>
          <Text style={styles.drawerAvatarText}>DA</Text>
        </View>
        <View>
          <Text style={styles.drawerTitle}>Dr. Ashraf</Text>
          <Text style={styles.drawerSubtitle}>+92 300 0000000</Text>
        </View>
      </View>

      {DRAWER_ITEMS.map(item => {
        const isActive = activeRoute === item.route;
        return (
          <Pressable
            key={item.route}
            onPress={() => props.navigation.navigate(item.route)}
            style={[styles.drawerItem, isActive && styles.drawerItemActive]}
            android_ripple={{ color: '#00000005' }}
          >
            <MaterialIcons
              name={item.icon}
              size={22}
              color={isActive ? '#D32F2F' : '#333333'}
              style={styles.drawerItemIcon}
            />
            <Text style={styles.drawerItemLabel}>{item.label}</Text>
          </Pressable>
        );
      })}

      <View style={styles.drawerSeparator} />

      <Pressable
        onPress={() => {
          clearToken();
          props.navigation.closeDrawer();
        }}
        style={styles.drawerLogoutButton}
        android_ripple={{ color: '#FFFFFF20' }}
      >
        <MaterialIcons name="logout" size={20} color="#FFFFFF" />
        <Text style={styles.drawerLogoutText}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
