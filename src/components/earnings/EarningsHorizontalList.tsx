import React, { FC, memo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

export interface BreakdownItem {
  label: string;
  amount: number;
  trips: number;
}

interface Props {
  title: string;
  data: BreakdownItem[];
}

const EarningsHorizontalList: FC<Props> = ({ title, data }) => {
  const styles = useGlobalStyles();

  return (
    <>
      <Text style={[styles.h6, globalStyles.mB15]}>{title}</Text>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: moderateScale(10),
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.border,
              globalStyles.padding15,
              globalStyles.mR10,
              globalStyles.centered,
              {
                width: moderateScale(115),
              },
            ]}
          >
            <Text style={styles.h6}>{item.label}</Text>

            <Text style={[styles.h5, globalStyles.mT10]}>
              Rs. {item.amount.toLocaleString()}
            </Text>

            <Text style={[styles.smallText, globalStyles.mT5]}>
              {item.trips} Trip(s)
            </Text>
          </View>
        )}
      />
    </>
  );
};

export default memo(EarningsHorizontalList);
