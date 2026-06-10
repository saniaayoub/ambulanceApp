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
import { useAuthStore } from '../../stores/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type SignUpForm = {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const { registerSubmit, sendOtp, authLoading } = useAuth();
  const role = useAuthStore(state => state.role);

  const { control, handleSubmit } = useForm<SignUpForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    const response = await registerSubmit({
      fullName: data.fullName,
      password: data.password,
      phone: data.phone,
      phone_country: null,
      role: role,
    });

    if (response.success) {
      const res = await sendOtp(phone);
      console.log(res, 'sent otp');
      if (res) {
        handleNavigateOTP();
      }
      // navigation.goBack();
    }
  };

  const handleNavigate = () => navigation.goBack();
  const handleNavigateOTP = () => navigation.navigate('OTPScreen');

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
        variant="shadowed"
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
