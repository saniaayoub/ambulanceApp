import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';

const SettingsSection = () => {
  const styles = useGlobalStyles();

  return (
    <TouchableOpacity
      style={[
        globalStyles.row,
        globalStyles.alignCenter,
        globalStyles.justifyBetween,
        styles.border,
        globalStyles.mV10,
        globalStyles.padding10,
      ]}
    >
      <MaterialDesignIcons
        name="bell-outline"
        size={moderateScale(22)}
        color={theme.colors.common.primary}
      />

      <Text style={[styles.text, globalStyles.mL10]}>Notifications</Text>

      <MaterialDesignIcons
        name="chevron-right"
        size={moderateScale(22)}
        color={theme.colors.common.primary}
      />
    </TouchableOpacity>
  );
};

export default SettingsSection;
