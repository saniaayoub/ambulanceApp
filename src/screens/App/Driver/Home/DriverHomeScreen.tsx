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

type Props = {
  navigation: any;
};

const DriverHomeScreen: FC<Props> = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useThemeStore(state => state.isDark);
  const {
    isOnline,
    toggleOnline,
    tripStep,
    todayEarnings,
    completedTrips,
    setIncomingRequest,
  } = useDriverStore();

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const navigateToEarnings = useCallback(() => {
    navigation.navigate('Earnings');
  }, [navigation]);

  // Simulate an incoming request for demo
  useEffect(() => {
    if (isOnline && tripStep === 'idle') {
      const timer = setTimeout(
        () => {
          setIncomingRequest({
            pickupLocation: 'Healthy Smile Clinic, Main Boulevard',
            destinationHospital: 'Jinnah Hospital, Jail Road',
            distance: '8.2 km',
            fareEstimate: 'Rs. 2,500',
            patientName: 'Muhammad Ali',
            patientPhone: '+92 300 1234567',
            timestamp: Date.now(),
          });
        },
        isOnline ? 8000 : 999999,
      );
      return () => clearTimeout(timer);
    }
  }, [isOnline, tripStep, setIncomingRequest]);

  useEffect(() => {
    if (isOnline && tripStep === 'navigate_to_pickup') {
      navigation.navigate('NavigateToPickup');
    }
  }, []);

  return (
    <View style={[globalStyles.flex, globalStyles.padding15, styles.card]}>
      <HomeHeader onOpenMenu={openDrawer} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Online/Offline Toggle */}
        <View
          style={[
            styles.border,
            globalStyles.padding15,
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.mB10,
            isOnline && { borderColor: theme.colors.common.success },
          ]}
        >
          <MaterialDesignIcons
            name="car"
            size={moderateScale(24)}
            color={
              isOnline ? theme.colors.common.success : theme.colors.common.black
            }
          />
          <Text style={[styles.h6, globalStyles.mL10, globalStyles.flex]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <Switch
            value={isOnline}
            onValueChange={toggleOnline}
            trackColor={{
              false: isDark
                ? theme.colors.common.black
                : theme.colors.common.white,
              true: theme.colors.common.success,
            }}
            thumbColor={theme.colors.common.white}
          />
        </View>

        {/* Driver Profile Card */}
        <View
          style={[
            styles.border,
            globalStyles.padding15,
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.mB10,
          ]}
        >
          <View style={styles.avatar}>
            <MaterialDesignIcons
              name="account"
              size={moderateScale(30)}
              color={theme.colors.common.white}
            />
          </View>
          <View style={[globalStyles.mL10]}>
            <Text style={styles.h4}>Dr. Ashraf</Text>
            <Text style={[styles.smallText, globalStyles.mT5]}>
              Vehicle: ABC-1234
            </Text>
          </View>
        </View>

        {/* Stats Row - Today's Earnings & Completed Trips */}
        <View style={[globalStyles.row, globalStyles.spaceBetween]}>
          <Pressable
            onPress={navigateToEarnings}
            style={[
              styles.border,
              globalStyles.padding15,
              globalStyles.halfwidth,
              globalStyles.mB10,
            ]}
          >
            <Text style={styles.smallText}>Today's Earnings</Text>
            <Text style={[styles.h4, globalStyles.mT5]}>
              Rs. {todayEarnings}
            </Text>
            <Text style={[styles.link, styles.smallText, globalStyles.mT5]}>
              View Details →
            </Text>
          </Pressable>

          <View
            style={[
              styles.border,
              globalStyles.padding15,
              globalStyles.halfwidth,
              globalStyles.mB10,
            ]}
          >
            <Text style={styles.smallText}>Completed Trips</Text>
            <Text style={[styles.h4, globalStyles.mT5]}>{completedTrips}</Text>
          </View>
        </View>

        {/* Live Map Placeholder */}
        <View
          style={[
            styles.border,
            globalStyles.centered,
            globalStyles.mB10,
            { height: moderateScale(180) },
          ]}
        >
          <MaterialDesignIcons
            name="map-outline"
            size={moderateScale(48)}
            color={theme.colors.common.black}
          />
          <Text style={[styles.smallText, globalStyles.mT5]}>
            Live Map View
          </Text>
        </View>
      </ScrollView>

      <IncomingRequestSheet />
    </View>
  );
};

export default DriverHomeScreen;
