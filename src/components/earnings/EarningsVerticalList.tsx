import React, { FC, memo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { BreakdownItem } from './EarningsHorizontalList';

interface Props {
  title: string;
  data: BreakdownItem[];
}

const EarningsVerticalList: FC<Props> = ({ title, data }) => {
  const styles = useGlobalStyles();

  return (
    <>
      <Text style={[styles.h6, globalStyles.mB15]}>{title}</Text>

      <FlatList
        scrollEnabled={false}
        data={data}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        ItemSeparatorComponent={() => <View style={globalStyles.mB10} />}
        renderItem={({ item }) => (
          <View style={[styles.border, globalStyles.padding15]}>
            <View
              style={[
                globalStyles.row,
                globalStyles.spaceBetween,
                globalStyles.alignCenter,
              ]}
            >
              <View style={globalStyles.flex}>
                <Text style={styles.h6}>{item.label}</Text>

                <Text style={[styles.smallText, globalStyles.mT5]}>
                  {item.trips} Trip(s)
                </Text>
              </View>

              <Text style={styles.h5}>Rs. {item.amount.toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default memo(EarningsVerticalList);
