import { View, Text } from 'react-native';
import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../styles/theme';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';

const ListEmptyComp = ({ icon, text }: { icon: string; text: string }) => {
  const styles = useGlobalStyles();
  return (
    <View
      style={[
        globalStyles.alignCenter,
        globalStyles.justifyCenter,
        {
          paddingTop: moderateScale(60),
        },
      ]}
    >
      <MaterialDesignIcons
        name={icon}
        size={moderateScale(60)}
        color={theme.colors.common.primary}
      />

      <Text style={[styles.h6, globalStyles.mT10]}>{text}</Text>
    </View>
  );
};

export default React.memo(ListEmptyComp);
