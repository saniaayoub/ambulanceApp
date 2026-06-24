import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const DashboardComp = ({
  navigateToEarnings,
  todayEarnings,
  completedTrips,
}: {
  navigateToEarnings: () => void;
  todayEarnings: number;
  completedTrips: number;
}) => {
  const styles = useGlobalStyles();
  return (
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
          Rs. {todayEarnings?.toLocaleString()}
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
        <Text style={[styles.h4, globalStyles.mT5]}>
          {completedTrips?.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default DashboardComp;
