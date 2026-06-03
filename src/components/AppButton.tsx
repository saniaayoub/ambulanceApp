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
  style?: ViewStyle;
  textStyle?: TextStyle;
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
  textStyle,
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
