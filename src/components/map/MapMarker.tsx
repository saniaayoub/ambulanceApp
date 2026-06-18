import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

interface Props {
  type: 'pickup' | 'destination' | 'driver' | 'hospital';
}

const MapMarker = ({ type }: Props) => {
  const getEmoji = () => {
    switch (type) {
      case 'pickup':
        return '📍';

      case 'destination':
        return '🏁';

      case 'driver':
        return '🚑';

      case 'hospital':
        return '🏥';

      default:
        return '📍';
    }
  };
  const styles = useGlobalStyles();
  return (
    <View
      style={[
        globalStyles.size40,
        globalStyles.centered,
        styles.whiteBtn,
        styles.round,
      ]}
    >
      <Text>{getEmoji()}</Text>
    </View>
  );
};

export default MapMarker;
