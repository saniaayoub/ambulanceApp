import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import { Ride } from '../../utils/ride';
import RideStatusChip from './RideStatusChip';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { ambulanceImages } from '../../utils/constants';
import { formatTripDate } from '../../utils/functions';

type Props = {
  item: Ride;
  onPress: () => void;
};

const RideCard = ({ item, onPress }: Props) => {
  const styles = useGlobalStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.border,
        styles.lightGreyCard,
        globalStyles.paddingV5,
        globalStyles.paddingH10,
        globalStyles.mB10,
      ]}
    >
      <View
        style={[
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.spaceBetween,
        ]}
      >
        <View style={[globalStyles.row, globalStyles.alignCenter]}>
          <Image
            source={ambulanceImages[item.ambulanceType]}
            resizeMode="contain"
            style={[globalStyles.size40, globalStyles.mR20]}
          />
          <Text style={styles.h6}>{item.ambulanceType}</Text>
        </View>
        <RideStatusChip status={item.status} />
      </View>

      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <View style={[globalStyles.row]}>
          <MaterialIcons
            name="cash"
            size={moderateScale(22)}
            color={theme.colors.common.success}
          />

          <Text style={styles.smallText}>
            {'  '}
            {item?.fare?.total}PKR
          </Text>
        </View>
        <View style={[globalStyles.row]}>
          <Text style={styles.smallText}>
            {formatTripDate(item?.updatedAt)}
          </Text>
          <MaterialIcons name="chevron-right" size={moderateScale(22)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RideCard);
