import { View, Text, Switch } from 'react-native';
import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

const OnlinieToggle = ({ isOnline, toggleOnline }) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.border,
        globalStyles.padding15,
        globalStyles.row,
        globalStyles.alignCenter,
        globalStyles.mB10,
        isOnline && { borderColor: theme.colors.common.success },
      ]}
    >
      <MaterialDesignIcons
        name="car"
        size={moderateScale(24)}
        color={
          isOnline ? theme.colors.common.success : theme.colors.common.black
        }
      />
      <Text style={[styles.h6, globalStyles.mL10, globalStyles.flex]}>
        {isOnline ? 'Online' : 'Offline'}
      </Text>
      <Switch
        value={isOnline}
        onValueChange={toggleOnline}
        trackColor={{
          false: theme.colors.light.border,
          true: theme.colors.common.success,
        }}
        thumbColor={theme.colors.common.white}
      />
    </View>
  );
};

export default OnlinieToggle;
