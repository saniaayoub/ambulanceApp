import { Text, View } from 'react-native';
import React from 'react';
import ProfileRow from './ProfileRow';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const PerformanceCard = ({
  rating,
  tripCount,
}: {
  rating: number;
  tripCount: number;
}) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.card,
        styles.border,
        globalStyles.padding10,
        globalStyles.mT10,
      ]}
    >
      <Text style={[styles.h5, globalStyles.mB10]}>Performance</Text>

      <ProfileRow
        label="Trips"
        value={tripCount?.toString()}
        icon="map-marker-path"
      />

      <ProfileRow label="Rating" value={`${rating} ★`} icon="star-outline" />
    </View>
  );
};

export default PerformanceCard;
