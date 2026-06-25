import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import theme from '../styles/theme';

// ===== Types =====

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | Array<Object>;
  icon?: string;
  textStyle?: TextStyle[] | TextStyle;
  iconColor?: string;
}

// ===== Component =====

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  icon,
  textStyle,
  iconColor,
}) => {
  const isDisabled = disabled || loading;
  const styles = useGlobalStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        globalStyles.centered,
        globalStyles.row,
        globalStyles.fullRadius,
        globalStyles.mV20,
        sizeStyles[size],
        isDisabled && globalStyles.disabled,
        styles.buttonCard,
        style,
      ]}
    >
      {icon ? (
        <MaterialDesignIcons
          name={icon}
          size={moderateScale(18)}
          color={iconColor ? iconColor : theme.colors.common.white}
          style={globalStyles.mR10}
        />
      ) : null}
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, styles.white, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(AppButton);

// Sizes
const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(12),
  },
  md: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
  },
  lg: {
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(20),
  },
};
