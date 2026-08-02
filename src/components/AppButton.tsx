import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import theme from '../styles/theme';
import { Pressable as GesturePressable } from 'react-native-gesture-handler';

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

  // NEW PROP
  useGestureHandler?: boolean;
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
  useGestureHandler = false,
}) => {
  const isDisabled = disabled || loading;
  const styles = useGlobalStyles();

  const buttonStyle = [
    globalStyles.centered,
    globalStyles.row,
    globalStyles.fullRadius,
    globalStyles.mV20,
    sizeStyles[size],
    isDisabled && globalStyles.disabled,
    styles.buttonCard,
    style,
  ];

  const content = (
    <>
      {icon ? (
        <MaterialDesignIcons
          name={icon}
          size={moderateScale(18)}
          color={iconColor ?? theme.colors.common.white}
          style={globalStyles.mR10}
        />
      ) : null}

      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, styles.white, textStyle]}>{title}</Text>
      )}
    </>
  );

  if (useGestureHandler && Platform.OS === 'android') {
    return (
      <GesturePressable
        onPress={onPress}
        disabled={isDisabled}
        style={buttonStyle}
      >
        {content}
      </GesturePressable>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={buttonStyle}
    >
      {content}
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
