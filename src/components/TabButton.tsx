import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { TouchableOpacity, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import React from 'react';
import { useThemeStore } from '../stores/themeStore';
import theme from '../styles/theme';

interface TabButtonProps {
  onPress: () => void;
  text: string;
  iconName: string;
}
const TabButton = ({ onPress, text, iconName }: TabButtonProps) => {
  const styles = useGlobalStyles();
  const { isDark } = useThemeStore();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.flexStart,
        styles.buttonContainer,
        styles.border,
        styles.shadow,
      ]}
      activeOpacity={0.8}
    >
      <MaterialDesignIcons
        name={iconName}
        size={moderateScale(22)}
        color={isDark ? theme.colors.dark.text : theme.colors.light.text}
      />
      <Text style={[styles.lightText, globalStyles.mL20]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(TabButton);
