import { View, Text, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

const ActiveTripComp = ({
  activeTrip,
  onPressDetails,
  onStartTrip,
  onArrived,
}: {
  activeTrip: any;
  onPressDetails: () => void;
  onStartTrip: () => void;
  onArrived: () => void;
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

  const Location = useCallback(
    ({ color, value }) => {
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
          <Text style={[styles.lightText, globalStyles.mT5]}>{value}</Text>
        </View>
      );
    },
    [activeTrip],
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
      />

      {/* Actions */}
      <View
        style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.mT10]}
      >
        <Pressable
          onPress={onPressDetails}
          style={[
            styles.border,
            globalStyles.padding10,
            globalStyles.halfwidth,
          ]}
        >
          <Text style={[styles.link, globalStyles.textCenter]}>
            View Details
          </Text>
        </Pressable>

        {activeTrip?.status === 'ASSIGNED' && (
          <Pressable
            onPress={onArrived}
            style={[styles.buttonCard, globalStyles.halfwidth]}
          >
            <Text style={[styles.buttonText, globalStyles.textCenter]}>
              Accept / Arrived
            </Text>
          </Pressable>
        )}

        {activeTrip?.status === 'ARRIVED' && (
          <Pressable
            onPress={onStartTrip}
            style={[styles.buttonCard, globalStyles.halfwidth]}
          >
            <Text style={[styles.buttonText, globalStyles.textCenter]}>
              Start Trip
            </Text>
          </Pressable>
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
