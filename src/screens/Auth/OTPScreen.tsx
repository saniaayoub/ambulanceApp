import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/auth/AuthWrapper';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { toastError } from '../../services/toast';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const OTP_LENGTH = 6;

type Props = NativeStackScreenProps<AuthStackParamList, 'OTPScreen'>;

const OTPScreen = ({ navigation, route }: Props) => {
  const email = route.params?.email ?? '';
  const { verifyOtp } = useAuth();
  const styles = useGlobalStyles();
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const { forgotPassword } = useAuth();
  const inputs = useRef<Array<TextInput | null>>([]);

  const otpValue = useMemo(() => code.join(''), [code]);

  const focusInput = (index: number) => {
    inputs.current[index]?.focus();
  };

  const handleChange = (value: string, index: number) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) {
      const next = [...code];
      next[index] = '';
      setCode(next);
      return;
    }

    const characters = cleanValue.split('').slice(0, OTP_LENGTH - index);
    const next = [...code];

    characters.forEach((digit, digitIndex) => {
      next[index + digitIndex] = digit;
    });

    setCode(next);

    const nextIndex = index + characters.length;
    if (nextIndex < OTP_LENGTH) {
      focusInput(nextIndex);
    } else {
      inputs.current[OTP_LENGTH - 1]?.blur();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      code[index] === '' &&
      index > 0
    ) {
      const previousIndex = index - 1;
      const next = [...code];
      next[previousIndex] = '';
      setCode(next);
      focusInput(previousIndex);
    }
  };

  const handleVerify = async () => {
    if (otpValue.length !== OTP_LENGTH) {
      toastError('Enter the 6-digit code');
      return;
    }
    await verifyOtp(otpValue);
    // navigation.navigate('ResetPassword', {
    //   email,
    //   code: otpValue,
    // });
  };

  const handleResend = async () => {
    if (!email) {
      toastError('Missing email address');
      return;
    }
    await forgotPassword({ email });
  };

  return (
    <AuthWrapper
      text="Verify Code"
      handleNavigate={() => navigation.navigate('Login', { type: 'patient' })}
      linkText1="Having trouble?"
      linkText2=" Back to login"
    >
      <Text style={[styles.text, globalStyles.mB20, globalStyles.textCenter]}>
        Enter the 6-digit code sent to phone number.
      </Text>

      <View
        style={[
          globalStyles.row,
          globalStyles.mB20,
          globalStyles.justifyBetween,
        ]}
      >
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            value={value}
            style={styless.otpBox}
            keyboardType="number-pad"
            returnKeyType="next"
            maxLength={1}
            onChangeText={nextValue => handleChange(nextValue, index)}
            onKeyPress={event => handleKeyPress(event, index)}
            textContentType={index === 0 ? 'oneTimeCode' : 'none'}
            importantForAutofill={index === 0 ? 'yes' : 'no'}
          />
        ))}
      </View>

      {/* <TouchableOpacity
        onPress={handleResend}
        style={[globalStyles.alignSelfCenter, globalStyles.mB20]}
      >
        <Text style={styles.lightText}>Resend code</Text>
      </TouchableOpacity> */}

      <AppButton
        disabled={otpValue.length !== OTP_LENGTH}
        title="Verify code"
        onPress={handleVerify}
        variant="primary"
        size="lg"
      />
    </AuthWrapper>
  );
};

const styless = StyleSheet.create({
  otpBox: {
    width: moderateScale(48),
    height: moderateScale(58),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: '#1f1f1f',
    backgroundColor: '#fff',
  },
});

export default OTPScreen;
