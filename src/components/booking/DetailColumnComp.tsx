import React, { FC } from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { Pressable, Text, View } from 'react-native';
import {
  ClockSvg,
  DestinationSvg,
  DistanceSvg,
  FareSvg,
  NearbySvg,
  PickupSvg,
} from '../../assets/images/svgs';
import { moderateScale } from 'react-native-size-matters';

type DetailCardProps = {
  title1: string;
  text1: string;
  title2: string;
  text2: string;
  style?: object;
};

const DetailCard: FC<DetailCardProps> = ({
  title1,
  text1,
  text2,
  title2,
  style,
}: DetailCardProps) => {
  const styles = useGlobalStyles();
  return (
    <View
      style={[
        globalStyles.padding10,
        globalStyles.row,
        styles.border,
        globalStyles.spaceBetween,
        globalStyles.mB10,
        style,
      ]}
    >
      <Pressable style={styles.statBox}>
        <View style={[globalStyles.row]}>
          {title1 === 'Distance' ? (
            <DistanceSvg width={moderateScale(25)} height={moderateScale(25)} />
          ) : title1 === 'Pickup' ? (
            <PickupSvg width={moderateScale(25)} height={moderateScale(25)} />
          ) : (
            <FareSvg width={moderateScale(25)} height={moderateScale(25)} />
          )}

          <Text style={[globalStyles.mL10, styles.smallText]}>{title1}</Text>
        </View>
        <Text style={styles.h6}>{text1}</Text>
      </Pressable>
      <View style={styles.verticalLine} />
      <Pressable style={styles.statBox}>
        <View style={[globalStyles.row]}>
          {title2 === 'Duration' ? (
            <ClockSvg width={moderateScale(25)} height={moderateScale(25)} />
          ) : title2 === 'Destination' ? (
            <DestinationSvg
              width={moderateScale(20)}
              height={moderateScale(20)}
            />
          ) : (
            <NearbySvg width={moderateScale(25)} height={moderateScale(25)} />
          )}
          <Text style={[globalStyles.mL10, styles.smallText]}>{title2}</Text>
        </View>
        <Text style={styles.h6}>{text2}</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(DetailCard);
