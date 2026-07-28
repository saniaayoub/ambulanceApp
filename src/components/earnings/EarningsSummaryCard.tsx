import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';

import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

interface Props {
  title: string;
  earnings: number;
  trips: number;
  average: number;
}

const EarningsSummaryCard: FC<Props> = ({
  title,
  earnings,
  trips,
  average,
}) => {
  const styles = useGlobalStyles();

  return (
    <View style={[styles.border, globalStyles.padding20, globalStyles.mB20]}>
      <Text style={[styles.smallText, globalStyles.textCenter]}>{title}</Text>

      <Text style={[styles.h4, globalStyles.textCenter, globalStyles.mT10]}>
        Rs. {earnings.toLocaleString()}
      </Text>

      <Text
        style={[styles.smallText, globalStyles.textCenter, globalStyles.mT5]}
      >
        {trips} Trip(s) Completed
      </Text>

      <View style={[styles.separator, globalStyles.mV15]} />

      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <View style={[globalStyles.flex, globalStyles.alignCenter]}>
          <Text style={styles.smallText}>Average / Trip</Text>

          <Text style={[styles.h6, globalStyles.mT5]}>
            Rs. {average.toLocaleString()}
          </Text>
        </View>

        <View style={[globalStyles.flex, globalStyles.alignCenter]}>
          <Text style={styles.smallText}>Total Trips</Text>

          <Text style={[styles.h6, globalStyles.mT5]}>{trips}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(EarningsSummaryCard);
