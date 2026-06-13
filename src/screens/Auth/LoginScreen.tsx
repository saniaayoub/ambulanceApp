import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/FormInput';
import PhoneNumberInput from '../../components/PhoneInput';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { phoneLoginSchema } from '../../validation/authSchemas';
import { useAuthStore } from '../../stores/authStore';
import { formatPhoneNumber } from '../../utils/phoneFormatter';

type LoginForm = {
  phone: string;
  password: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const styles = useGlobalStyles();

  const { loginSubmit, authLoading, setToken } = useAuth();
  const { role, selectedCountry } = useAuthStore();

  const currentSchema = phoneLoginSchema;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<LoginForm, any, any>(currentSchema as any) as any,
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    await loginSubmit({
      phone: formatPhoneNumber(data.phone, selectedCountry?.dialCode),
      password: data.password,
    });
  };

  const handleNavigate = () => navigation.navigate('SignUp');
  const handleNavigateForgotPassword = () =>
    navigation.navigate('ForgotPassword');

  return (
    <AuthWrapper
      text={'Log in to your account'}
      handleNavigate={handleNavigate}
      linkText1={role === 'USER' ? 'New to AmbulanceApp?' : ''}
      linkText2={role === 'USER' ? ' Create an account' : ''}
      // style={globalStyles.mT50}
    >
      <PhoneNumberInput
        control={control}
        name="phone"
        label="Phone Number"
        variant="shadowed"
        rules={{
          required: 'Phone number is required',
          minLength: {
            value: 7,
            message: 'Invalid phone number',
          },
        }}
      />

      <FormInput
        variant="shadowed"
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password"
        secureTextEntry
      />

      {/* <TouchableOpacity
        onPress={handleNavigateForgotPassword}
        style={[globalStyles.mB20]}
      >
        <Text style={styles.lightText}>Forget your password?</Text>
      </TouchableOpacity> */}

      <AppButton
        title="Log In"
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
        loading={authLoading}
      />
    </AuthWrapper>
  );
};

export default LoginScreen;
