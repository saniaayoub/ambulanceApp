import React, { forwardRef } from 'react';
import {
  Text,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useThemedStyles } from '../styles/createThemedStyles';
import { globalStyles } from '../styles/globalStyles';

export type Variant = 'outlined' | 'filled' | 'shadowed' | 'blank';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: Variant;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    { label, error, variant = 'outlined', containerStyle, inputStyle, ...rest },
    ref,
  ) => {
    const styles = useStyles(variant);
    console.log('gu', label);

    return (
      <View style={[globalStyles.fullWidth, globalStyles.mB10, containerStyle]}>
        {!!label && <Text style={styles.label}>{label}</Text>}

        <TextInput
          ref={ref}
          style={[styles.input, inputStyle]}
          placeholderTextColor={styles.placeholder.color}
          {...rest}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}
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
      height: verticalScale(48),
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
