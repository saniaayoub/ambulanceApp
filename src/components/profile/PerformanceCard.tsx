import { Text, View } from 'react-native';
import React from 'react';
import ProfileRow from './ProfileRow';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const PerformanceCard = () => {
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

      <ProfileRow label="Trips" value="523" icon="map-marker-path" />

      <ProfileRow label="Rating" value="4.9 ★" icon="star-outline" />
    </View>
  );
};

export default PerformanceCard;
