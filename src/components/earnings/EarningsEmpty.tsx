import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const EarningsEmpty: FC = () => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.border,
        globalStyles.padding30,
        globalStyles.centered,
        globalStyles.mT20,
      ]}
    >
      <Text style={styles.h6}>No Earnings Found</Text>

      <Text
        style={[styles.smallText, globalStyles.textCenter, globalStyles.mT10]}
      >
        No completed trips were found for this period.
      </Text>
    </View>
  );
};

export default EarningsEmpty;
