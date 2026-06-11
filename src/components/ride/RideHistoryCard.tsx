import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-design-icons';

import { Ride } from '../../utils/ride';

import RideStatusChip from './RideStatusChip';

import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { VentilatorAmbulance } from '../../assets/images/pngs';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';

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
          globalStyles.spaceBetween,
          globalStyles.alignCenter,
        ]}
      >
        <Image
          source={VentilatorAmbulance}
          resizeMode="contain"
          style={globalStyles.size40}
        />
        <Text style={styles.h6}>{item.ambulanceType}</Text>

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
            {item.fare}PKR
          </Text>
        </View>
        <View style={[globalStyles.row]}>
          <Text style={styles.smallText}>Fri, 30 jun 22:10</Text>
          <MaterialIcons name="chevron-right" size={moderateScale(22)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(RideCard);
