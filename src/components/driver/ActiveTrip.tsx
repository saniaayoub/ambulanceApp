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
  driverLoc,
}: {
  activeTrip: any;
  onPressDetails: () => void;
  onStartTrip: () => void;
  onArrived: () => void;
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
  console.log(
    activeTrip?.status,
    distanceM,
    distanceM <= 100,
    driverLoc,
    activeTrip?.pickupLocation,
    'kk',
  );
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

        {activeTrip?.status === 'ASSIGNED' && (
          <AppButton
            onPress={onArrived}
            disabled={distanceM >= 100}
            style={[globalStyles.halfwidth, globalStyles.mB0, globalStyles.mT0]}
            title="Arrived"
            textStyle={[styles.smallText, styles.white]}
          />
        )}

        {activeTrip?.status === 'WAITING' && (
          <AppButton
            onPress={onStartTrip}
            style={[globalStyles.halfwidth, globalStyles.mB0, globalStyles.mT0]}
            title="Start Trip"
            textStyle={[styles.smallText, styles.white]}
          />
        )}

        {activeTrip?.status === 'STARTED' && (
          <View style={[styles.lightGreyCard, globalStyles.halfwidth]}>
            <Text style={[styles.h6, globalStyles.textCenter]}>
              In Progress
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ActiveTripComp;
