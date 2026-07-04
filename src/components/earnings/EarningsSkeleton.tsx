import React, { FC } from 'react';
import { View } from 'react-native';

import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const Box = ({ height }: { height: number }) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.lightGreyCard,
        styles.round,
        globalStyles.mB15,
        { height, width: '100%' },
      ]}
    />
  );
};

const EarningsSkeleton: FC = () => {
  return (
    <View style={globalStyles.padding15}>
      <Box height={55} />

      <Box height={150} />

      <Box height={25} />

      <Box height={90} />

      <Box height={90} />

      <Box height={90} />
    </View>
  );
};

export default EarningsSkeleton;
