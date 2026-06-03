import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/FormInput';
import PhoneNumberInput from '../../components/PhoneInput';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { globalStyles } from '../../styles/globalStyles';
import { registerSchema } from '../../validation/authSchemas';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type SignUpForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const { registerSubmit, authLoading } = useAuth();

  const { control, handleSubmit } = useForm<SignUpForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    const response = await registerSubmit({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      phone: data.phone,
      phone_country: null,
    });

    if (response.success) {
      navigation.goBack();
    }
  };

  const handleNavigate = () => navigation.navigate('OtpResetPassword');

  return (
    <AuthWrapper
      text="Sign up to  book an ambulance"
      handleNavigate={handleNavigate}
      linkText1="Already have an account?"
      linkText2=" Log In"
      style={globalStyles.negmargin20}
    >
      <FormInput
        variant="shadowed"
        control={control}
        name="fullName"
        label="Full Name"
        placeholder="Enter Full Name"
      />

      <FormInput
        variant="shadowed"
        control={control}
        name="email"
        label="Email"
        placeholder="Enter Email"
      />
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
      />
      <FormInput
        variant="shadowed"
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm password"
      />

      <AppButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
        loading={authLoading}
      />
    </AuthWrapper>
  );
};

export default SignUpScreen;
