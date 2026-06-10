import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/FormInput';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { forgotPasswordSchema } from '../../validation/authSchemas';
import { useForm } from 'react-hook-form';

type ForgotPasswordForm = {
  email: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const { forgotPassword, authLoading } = useAuth();

  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema) as any,
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    const response = await forgotPassword({ email: data.email });
    if (response.success) {
      navigation.navigate('OTPScreen', { email: data.email });
    }
  };

  return (
    <AuthWrapper text="Forgot Password">
      <FormInput
        control={control}
        name="email"
        label="Email address"
        placeholder="Enter your email"
        variant="shadowed"
      />

      <AppButton
        title="Send reset code"
        onPress={handleSubmit(onSubmit)}
        loading={authLoading}
        variant="primary"
        size="lg"
      />
    </AuthWrapper>
  );
};

export default ForgotPasswordScreen;
