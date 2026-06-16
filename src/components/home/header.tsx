import React, { type FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';

type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

type Props = {
  onOpenMenu?: () => void;
  locationLabel?: string;
  handleLocationPress?: () => void;
  name?: string;
};

const HomeHeader: FC<Props> = ({
  onOpenMenu,
  handleLocationPress,
  locationLabel,
  name,
}) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        // globalStyles.flex,
        globalStyles.row,
        globalStyles.mR10,
        globalStyles.alignCenter,
        globalStyles.paddingB10,
      ]}
    >
      <Pressable
        style={[globalStyles.row, globalStyles.mR10]}
        onPress={onOpenMenu}
      >
        <MaterialIcons
          name={'menu' as IconName}
          size={moderateScale(24)}
          color="#212121"
        />
      </Pressable>
      <View style={globalStyles.flex}>
        <Text style={styles.h4}>{name}</Text>
        <Pressable
          style={[
            globalStyles.row,
            globalStyles.width90,
            globalStyles.alignCenter,
          ]}
          onPress={handleLocationPress}
        >
          <MaterialIcons
            name={'map-marker-outline'}
            size={moderateScale(18)}
            color={theme.colors.common.primary}
          />
          <Text style={[styles.smallText, globalStyles.mH10]}>
            {locationLabel}
          </Text>

          <MaterialIcons
            name={'chevron-right'}
            size={moderateScale(18)}
            color={theme.colors.common.primary}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;
