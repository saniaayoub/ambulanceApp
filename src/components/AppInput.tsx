import React, { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
  type TextStyle,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useThemedStyles } from '../styles/createThemedStyles';
import { globalStyles } from '../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import theme from '../styles/theme';

export type Variant = 'outlined' | 'filled' | 'shadowed' | 'blank';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: Variant;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: string;
  rightIcon?: string;
  onPressRightIcon?: () => void;
}

const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    {
      label,
      error,
      variant = 'outlined',
      containerStyle,
      inputStyle,
      leftIcon,
      rightIcon,
      onPressRightIcon,
      ...rest
    },
    ref,
  ) => {
    const [hidePassword, setHidePassword] = useState(
      rest.secureTextEntry ?? false,
    );
    const styles = useStyles(variant);
    return (
      <View style={[globalStyles.fullWidth, globalStyles.mB10, containerStyle]}>
        {!!label && <Text style={styles.label}>{label}</Text>}
        {leftIcon ? (
          <View
            style={[
              globalStyles.absPosition,
              globalStyles.paddingL10,
              globalStyles.greaterzIndex,
              globalStyles.mT5,
            ]}
          >
            <MaterialDesignIcons
              name={leftIcon}
              size={moderateScale(20)}
              color={theme.colors.common.primary}
            />
          </View>
        ) : null}

        <TextInput
          ref={ref}
          style={[
            styles.input,
            leftIcon && globalStyles.paddingL40,
            inputStyle,
          ]}
          placeholderTextColor={styles.placeholder.color}
          {...rest}
          secureTextEntry={hidePassword}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        {rest.secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setHidePassword(prev => !prev)}
            style={[
              globalStyles.absPosition,
              globalStyles.row,

              globalStyles.greaterzIndex,
              {
                right: moderateScale(10),
                top: verticalScale(42),
              },
            ]}
          >
            <MaterialDesignIcons
              name={hidePassword ? 'eye-off' : 'eye'}
              size={moderateScale(20)}
              color={theme.colors.common.primary}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onPressRightIcon}
            style={[
              globalStyles.absPosition,
              globalStyles.row,
              globalStyles.greaterzIndex,
              {
                right: moderateScale(10),
                top: moderateScale(10),
              },
            ]}
          >
            <MaterialDesignIcons
              name={rightIcon}
              size={moderateScale(20)}
              color={theme.colors.common.primary}
            />

            <Text style={[globalStyles.mL5]}>Map</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);

export default React.memo(AppInput);

const useStyles = (variant: Variant) => {
  return useThemedStyles(({ colors, typography, radius }) => ({
    container: {
      marginBottom: verticalScale(16),
    },

    label: {
      ...typography.body,
      marginBottom: verticalScale(6),
      color: colors.text,
    },

    input: {
      ...typography.size13,
      height: verticalScale(40),
      paddingHorizontal: moderateScale(15),
      color: colors.text,

      ...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
      }),

      ...(variant === 'filled' && {
        backgroundColor: colors.border,
      }),

      ...(variant === 'shadowed' && {
        backgroundColor: colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.base,
      }),

      ...(variant === 'blank' && {
        backgroundColor: 'transparent',
      }),
    },

    placeholder: {
      color: colors.textSecondary,
    },

    error: {
      marginTop: verticalScale(4),
      color: colors.error,
      fontSize: moderateScale(12),
    },
  }));
};
