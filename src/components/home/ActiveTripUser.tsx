import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { getDistance } from 'geolib';
import AppButton from '../AppButton';
import { Location as LocationProp } from '../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { Location } from '../driver/ActiveTrip';

type Props = {
  activeTrip: any;
  driverLoc: LocationProp | null;
  onCancelTrip: () => void;
  onPressDetails: () => void;
  stopSearching: () => void;
};

const ActiveTripUser = ({
  activeTrip,
  driverLoc,
  onPressDetails,
  stopSearching,
  onCancelTrip,
}: Props) => {
  const styles = useGlobalStyles();

  const getStatusText = () => {
    switch (activeTrip?.status) {
      case 'SEARCHING':
        return 'Looking for Driver';

      case 'ASSIGNED':
        return 'Current Booking';

      case 'ARRIVED':
        return 'Driver Arrived';

      case 'WAITING':
        return 'Driver Waiting';

      case 'STARTED':
        return 'Trip in Progress';

      case 'COMPLETED':
        return 'Submit a Review';

      case 'CANCELLED':
        return 'Trip Cancelled';

      default:
        return 'Current Trip';
    }
  };

  const driverDistance = useMemo(() => {
    if (
      !driverLoc ||
      !activeTrip?.pickupLocation ||
      activeTrip?.status !== 'ASSIGNED'
    ) {
      return null;
    }

    const { latitude, longitude } = driverLoc;

    const { lat, lng } = activeTrip.pickupLocation;

    if (latitude == null || longitude == null || lat == null || lng == null) {
      return null;
    }

    return getDistance(
      {
        latitude,
        longitude,
      },
      {
        latitude: lat,
        longitude: lng,
      },
    );
  }, [driverLoc, activeTrip]);

  const getTripAction = () => {
    switch (activeTrip?.status) {
      case 'SEARCHING':
        return {
          title: 'Stop Searching',
          onPress: stopSearching,
        };

      case 'ASSIGNED':
      case 'ARRIVED':
      case 'WAITING':
        return {
          title: 'Cancel Trip',
          onPress: onCancelTrip,
        };

      case 'ASSIGNED':
      case 'ARRIVED':
      case 'WAITING':
      case 'STARTED':
        return {
          title: 'Track Driver',
          onPress: onPressDetails,
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
        globalStyles.paddingH15,
        globalStyles.mB10,
        {
          borderColor: theme.colors.common.success,
        },
      ]}
    >
      {/* Header */}
      <View
        style={[
          globalStyles.row,
          globalStyles.centered,
          globalStyles.spaceBetween,
        ]}
      >
        <Text style={styles.h5}>{getStatusText()}</Text>
        {/* <Text style={styles.h5}>Current Booking</Text> */}

        <Text style={styles.smallText}>
          🚑 {activeTrip?.driverId?.userId?.fullName}{' '}
          {activeTrip?.vehicleId?.vehicleNumber}
          {/* {activeTrip?.id?.slice(-6) || '--'} */}
        </Text>
      </View>

      {/* Pickup */}
      <Location
        color={theme.colors.common.success}
        value={activeTrip?.pickupLocation?.address || 'N/A'}
        styles={styles}
      />

      {/* Divider */}
      <View style={[globalStyles.row, globalStyles.alignCenter]}>
        <View style={[globalStyles.mL3, globalStyles.mR10]}>
          <View style={[styles.greyCard, styles.dot]} />
          <View style={[styles.greyCard, styles.dot]} />
          <View style={[styles.greyCard, styles.dot]} />
        </View>

        <View style={styles.horizontalLine} />
      </View>

      {/* Destination */}
      <Location
        color={theme.colors.common.warning}
        value={
          activeTrip?.destinationLocation?.address ||
          activeTrip?.destination?.address ||
          'N/A'
        }
        styles={styles}
      />

      {/* Driver Info */}
      {/* {activeTrip?.driverId.userId && (
        <View style={[globalStyles.mT10, globalStyles.row]}>
          <Text style={styles.smallText}>
            Driver: {activeTrip.driverId.userId.fullName}
          </Text>

          {activeTrip?.driverId?.userId.phone && (
            <Text style={styles.smallText}>
              Phone: {activeTrip.driverId.userId.phone}
            </Text>
          )}
        </View>
      )} */}

      {/* Driver Distance */}
      {driverDistance != null && (
        <Text
          style={[
            styles.smallText,
            globalStyles.mT10,
            { color: theme.colors.common.success },
          ]}
        >
          Driver is approximately {(driverDistance / 1000).toFixed(1)} km away.
        </Text>
      )}

      {/* Actions */}
      <View
        style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.mT10]}
      >
        <AppButton
          title="View Details"
          onPress={onPressDetails}
          style={[
            globalStyles.halfwidth,
            styles.whiteBtn,
            styles.border,
            styles.round,
            globalStyles.mB0,
            globalStyles.mT0,
          ]}
          textStyle={styles.smallText}
        />

        {action && (
          <AppButton
            title={action.title}
            onPress={action.onPress}
            style={[globalStyles.halfwidth, globalStyles.mB0, globalStyles.mT0]}
            textStyle={[styles.smallText, styles.white]}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(ActiveTripUser);
