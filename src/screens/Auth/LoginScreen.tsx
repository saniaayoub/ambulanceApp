import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { useThemeStore } from '../../stores/themeStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { loginSchema, phoneLoginSchema } from '../../validation/authSchemas';
import { useAuth } from '../../hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/FormInput';
import PhoneNumberInput from '../../components/PhoneInput';

type LoginForm = {
  email: string;
  phone: string;
  password: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation, route }: Props) => {
  const type = route.params?.type;
  const styles = useGlobalStyles();
  const { toggleTheme } = useThemeStore();

  const { loginSubmit, authLoading } = useAuth(type);

  const currentSchema = type === 'phone' ? phoneLoginSchema : loginSchema;

  const { control, handleSubmit } = useForm<LoginForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<LoginForm, any, any>(currentSchema as any) as any,
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    await loginSubmit({
      email: type === 'email' ? data.email : undefined,
      phone: type === 'phone' ? data.phone : null,
      password: data.password,
      auth_field: type === 'phone' ? 'phone' : 'email',
      phone_country: null,
      captcha_key: 'accusamus',
    });
  };

  const handleNavigate = () => navigation.navigate('SignUp');

  return (
    <AuthWrapper
      text={type === 'email' ? 'Log in with Email' : 'Log in with Phone'}
      handleNavigate={handleNavigate}
      linkText1="New to AmbulanceApp?"
      linkText2=" Create an account"
      style={globalStyles.mT50}
    >
      {type === 'email' ? (
        <FormInput
          variant="shadowed"
          control={control}
          name="email"
          label="Email"
          placeholder="Enter email"
        />
      ) : (
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
      )}

      <FormInput
        variant="shadowed"
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password"
      />

      <TouchableOpacity
        onPress={() => toggleTheme()}
        style={[globalStyles.mB20]}
      >
        <Text style={styles.h4}>Forget your password?</Text>
      </TouchableOpacity>

      <AppButton
        title="Log In"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
        loading={authLoading}
      />
    </AuthWrapper>
  );
};

export default LoginScreen;
