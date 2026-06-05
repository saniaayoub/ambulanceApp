import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../styles/theme';
import { useThemeStore } from '../stores/themeStore';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ title }: { title: string }) => {
  const isDark = useThemeStore(state => state.isDark);
  const styles = useGlobalStyles();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        globalStyles.row,
        globalStyles.paddingV15,
        globalStyles.paddingH15,
        globalStyles.alignCenter,
        styles.card,
      ]}
      onPress={() => navigation.goBack()}
    >
      <MaterialDesignIcons
        name="chevron-left"
        size={moderateScale(24)}
        color={
          isDark ? theme.colors.light.background : theme.colors.dark.background
        }
      />

      {title ? (
        <Text style={[styles.h4, globalStyles.mL10]}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  );
};
export default React.memo(BackButton);
