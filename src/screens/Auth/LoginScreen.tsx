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

type LoginForm = {
  email: string;
  phone: string;
  password: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation, route }: Props) => {
  const type = route.params?.type;
  const styles = useGlobalStyles();

  const { loginSubmit, authLoading } = useAuth();
  const { setToken } = useAuth();
  const currentSchema = phoneLoginSchema;

  const { control, handleSubmit } = useForm<LoginForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<LoginForm, any, any>(currentSchema as any) as any,
    defaultValues: {
      phone: '',
      password: '',
      // phone_country: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    // await loginSubmit({
    //   phone: data.phone,
    //   password: data.password,
    //   phone_country: null,
    // });
    console.log('Login data:', data);
    setToken('dummy_token');
  };

  const handleNavigate = () => navigation.navigate('SignUp');
  const handleNavigateForgotPassword = () =>
    navigation.navigate('ForgotPassword');

  return (
    <AuthWrapper
      text={'Log in to your account'}
      handleNavigate={handleNavigate}
      linkText1={type === 'patient' ? 'New to AmbulanceApp?' : ''}
      linkText2={type === 'patient' ? ' Create an account' : ''}
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

      <TouchableOpacity
        onPress={handleNavigateForgotPassword}
        style={[globalStyles.mB20]}
      >
        <Text style={styles.lightText}>Forget your password?</Text>
      </TouchableOpacity>

      <AppButton
        title="Log In"
        // onPress={handleSubmit(onSubmit)}
        onPress={onSubmit}
        variant="primary"
        size="lg"
        loading={authLoading}
      />
    </AuthWrapper>
  );
};

export default LoginScreen;
