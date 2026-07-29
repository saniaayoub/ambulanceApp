import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TripData } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { makeaCall } from '../../utils/functions';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
import { Location } from './ActiveTrip';
import ShowWaitingTimer from './ShowWaitingTimer';
import BackButton from '../BackButton';

type Props = {
  currentTrip: TripData | null;
  handlePress: () => void;
  handleCancel?: () => void;

  etaMinutes: any;
  distance: string | null;
  title: string;
  btnTitle: string;

  showWaiting?: boolean;
  showCancel?: boolean;
  disableActionButton?: boolean;
  navigation: any;
  distanceMeters?: number;
};

const NavigateToPickupSheet = ({
  currentTrip,
  handlePress,
  handleCancel,
  etaMinutes,
  distance,
  title,
  btnTitle,
  showWaiting = false,
  showCancel = true,
  distanceMeters,
  disableActionButton = distanceMeters !== undefined && distanceMeters > 100,
  navigation,
}: Props) => {
  const styles = useGlobalStyles();

  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <BackButton title={title} style={[globalStyles.paddingH0]} />

      {/* Pickup & Destination */}
      <View style={[globalStyles.paddingH10, globalStyles.mB15]}>
        <Location
          color={theme.colors.common.success}
          value={currentTrip?.pickupLocation?.address || 'N/A'}
          styles={styles}
        />

        <View style={[globalStyles.row, globalStyles.alignCenter]}>
          <View style={globalStyles.mR20}>
            <View style={[styles.greyCard, styles.dot]} />
            <View style={[styles.greyCard, styles.dot]} />
            <View style={[styles.greyCard, styles.dot]} />
          </View>
          <View style={styles.horizontalLine} />
        </View>

        <Location
          color={theme.colors.common.warning}
          value={currentTrip?.destination?.address || 'N/A'}
          styles={styles}
        />
      </View>

      {/* Waiting Timer */}
      {showWaiting && (
        <ShowWaitingTimer
          waitingStartedAt={currentTrip?.waitingStartedAt}
          styles={styles}
        />
      )}

      {/* ETA / Distance */}
      <DetailColumnComp
        title1="ETA"
        text1={`${etaMinutes ?? '--'} min`}
        title2="Distance"
        text2={`${distance ?? '--'}`}
      />

      {/* Patient */}
      <View
        style={[
          styles.border,
          globalStyles.padding10,
          globalStyles.mB15,
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.spaceBetween,
        ]}
      >
        <View style={[globalStyles.row, globalStyles.alignCenter]}>
          <View style={styles.iconStyle40}>
            <MaterialDesignIcons
              name="account"
              size={moderateScale(24)}
              color={theme.colors.common.primary}
            />
          </View>

          <View>
            <Text style={styles.h6}>{currentTrip?.userId?.fullName}</Text>

            <Text style={styles.smallText}>Patient</Text>
          </View>
        </View>

        <Pressable
          onPress={() => makeaCall(currentTrip?.userId?.phone)}
          style={[
            globalStyles.size40,
            styles.round,
            styles.buttonCard,
            globalStyles.centered,
          ]}
        >
          <MaterialDesignIcons
            name="phone"
            size={moderateScale(20)}
            color={theme.colors.common.white}
          />
        </Pressable>
      </View>

      {/* Bottom Buttons */}
      <View
        style={[
          globalStyles.row,
          showCancel ? globalStyles.spaceBetween : globalStyles.justifyCenter,
        ]}
      >
        {showCancel && (
          <AppButton
            title="Cancel Ride"
            onPress={handleCancel}
            style={[
              styles.whiteBtn,
              globalStyles.mV5,
              globalStyles.halfwidth,
              styles.border,
              styles.round,
            ]}
            textStyle={styles.text2}
          />
        )}

        <AppButton
          title={btnTitle}
          onPress={handlePress}
          style={[
            globalStyles.mV5,
            showCancel ? globalStyles.halfwidth : { width: '100%' },
          ]}
          disabled={disableActionButton}
        />
      </View>
    </View>
  );
};

export default React.memo(NavigateToPickupSheet);
