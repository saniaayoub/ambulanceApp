import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useForm } from 'react-hook-form';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/auth/AuthWrapper';
import FormInput from '../../components/FormInput';
import PhoneNumberInput from '../../components/PhoneInput';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { useAuthStore } from '../../stores/authStore';
import { globalStyles } from '../../styles/globalStyles';
import { registerSchema } from '../../validation/authSchemas';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type SignUpForm = {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const { registerSubmit, authLoading } = useAuth();

  const role = useAuthStore(state => state.role);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<SignUpForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<SignUpForm, any, any>(registerSchema as any) as any,
    defaultValues: {
      fullName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: role,
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    await registerSubmit(data);
    reset();
  };

  const handleNavigate = () => navigation.goBack();

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

      <PhoneNumberInput
        variant="shadowed"
        control={control}
        name="phone"
        label="Phone Number"
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
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
        loading={authLoading}
      />
    </AuthWrapper>
  );
};

export default SignUpScreen;
