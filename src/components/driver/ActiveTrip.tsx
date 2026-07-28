import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';
import { Location as LocationProp } from '../../stores/locationStore';
import { getDistance } from 'geolib';

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
      <Text style={[styles.smallText, globalStyles.mT5]}>{value}</Text>
    </View>
  );
};

const ActiveTripComp = ({
  activeTrip,
  onPressDetails,
  onStartTrip,
  onArrived,
  onCompleteTrip,
  driverLoc,
}: {
  activeTrip: any;
  onPressDetails: () => void;
  onStartTrip: () => void;
  onArrived: () => void;
  onCompleteTrip: () => void;
  driverLoc: LocationProp | null;
}) => {
  const styles = useGlobalStyles();

  const getStatusText = () => {
    switch (activeTrip?.status) {
      case 'ASSIGNED':
        return 'New Trip Assigned';
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
  const distanceM = useMemo(() => {
    if (activeTrip?.status === 'ASSIGNED') {
      const driverLat = driverLoc?.latitude;
      const driverLng = driverLoc?.longitude;
      const pickupLat = activeTrip?.pickupLocation?.lat;
      const pickupLng = activeTrip?.pickupLocation?.lng;

      if (
        driverLat == null ||
        driverLng == null ||
        pickupLat == null ||
        pickupLng == null
      ) {
        return Infinity;
      }

      return getDistance(
        {
          latitude: driverLat,
          longitude: driverLng,
        },
        {
          latitude: pickupLat,
          longitude: pickupLng,
        },
      );
    }
    return null;
  }, [driverLoc, activeTrip]);

  const getTripAction = () => {
    switch (activeTrip?.status) {
      case 'ASSIGNED':
        return {
          title: 'Arrived',
          onPress: onArrived,
          disabled: distanceM !== null && distanceM >= 100,
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
          disabled: distanceM !== null && distanceM >= 100,
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
