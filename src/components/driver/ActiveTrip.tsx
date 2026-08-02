import React from 'react';
import { Text, View } from 'react-native';
import { DriverTrackingInfo } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';
import { moderateScale } from 'react-native-size-matters';

export const Location = ({
  color,
  value,
  styles,
}: {
  color: string;
  value: string;
  styles: any;
}) => {
  return (
    <View style={[globalStyles.row, globalStyles.alignCenter]}>
      <View
        style={[
          styles.round,
          globalStyles.mT5,
          globalStyles.size10,
          globalStyles.centered,
          globalStyles.mR10,
          { backgroundColor: color },
        ]}
      >
        <View style={[styles.round, globalStyles.size5, styles.card]} />
      </View>
      <Text
        style={[
          styles.smallText,
          globalStyles.mT5,
          { marginRight: moderateScale(15) },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const ActiveTripComp = ({
  activeTrip,
  onPressDetails,
  onStartTrip,
  onArrived,
  onCompleteTrip,
  tracking,
  onPaymentRecieved,
}: {
  activeTrip: any;
  onPressDetails: () => void;
  onStartTrip: () => void;
  onArrived: () => void;
  onCompleteTrip: () => void;
  tracking: DriverTrackingInfo;
  onPaymentRecieved: () => {};
}) => {
  const styles = useGlobalStyles();

  const getStatusText = () => {
    switch (activeTrip?.status) {
      case 'ASSIGNED':
        return 'Current Booking';
      case 'ARRIVED':
        return 'Arrived at Pickup';
      case 'WAITING':
        return 'Waiting at Location';
      case 'STARTED':
        return 'Trip in Progress';
      default:
        return 'Active Trip';
    }
  };

  const getTripAction = () => {
    switch (activeTrip?.status) {
      case 'ASSIGNED':
        return {
          title: 'Arrived',
          onPress: onArrived,
          disabled:
            tracking?.distanceMeters !== null && tracking.distanceMeters <= 100,
        };

      case 'WAITING':
        return {
          title: 'Start Trip',
          onPress: onStartTrip,
          disabled: false,
        };

      case 'STARTED':
        return {
          title: 'Complete',
          onPress: onCompleteTrip, // or onStartTrip if intentional
          disabled:
            tracking?.distanceMeters !== null &&
            tracking?.distanceMeters <= 100,
        };
      case 'COMPLETED':
        return {
          title: 'Paid',
          onPress: onPaymentRecieved, // or onStartTrip if intentional
          disabled: false,
        };

      default:
        return null;
    }
  };

  const action = getTripAction();
  return (
    <View
      style={[
        globalStyles.mT10,
        styles.border,
        globalStyles.paddingV10,
        globalStyles.paddingH20,
        globalStyles.mB10,
        { borderColor: theme.colors.common.success },
      ]}
    >
      {/* Header */}
      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <Text style={[styles.h5]}>{getStatusText()}</Text>
        <Text style={[styles.smallText]}>#{activeTrip?._id?.slice(-6)}</Text>
      </View>

      {/* Pickup */}
      <Location
        color={theme.colors.common.success}
        value={activeTrip?.pickupLocation?.address || 'N/A'}
        styles={styles}
      />
      {/* <View
        style={[styles.verticalLine, globalStyles.height20, styles.buttonCard]}
      /> */}
      <View style={[globalStyles.row, globalStyles.alignCenter]}>
        <View style={[globalStyles.mR20]}>
          <View style={[styles.greyCard, styles.dot]} />
          <View style={[styles.greyCard, styles.dot]} />
          <View style={[styles.greyCard, styles.dot]} />
        </View>
        <View style={styles.horizontalLine} />
      </View>

      {/* Destination */}
      <Location
        color={theme.colors.common.warning}
        value={activeTrip?.destination?.address || 'N/A'}
        styles={styles}
      />

      {/* Actions */}
      <View
        style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.mT10]}
      >
        <AppButton
          style={[
            globalStyles.halfwidth,
            styles.whiteBtn,
            styles.border,
            styles.round,
            globalStyles.mB0,
            globalStyles.mT0,
          ]}
          title="View Details"
          onPress={onPressDetails}
          textStyle={styles.smallText}
        />

        {action && (
          <AppButton
            onPress={action.onPress}
            disabled={action.disabled}
            style={[globalStyles.halfwidth, globalStyles.mB0, globalStyles.mT0]}
            title={action.title}
            textStyle={[styles.smallText, styles.white]}
          />
        )}
      </View>
    </View>
  );
};

export default ActiveTripComp;
