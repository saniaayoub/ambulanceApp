import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useForm } from 'react-hook-form';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/FormInput';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { resetPasswordSchema } from '../../validation/authSchemas';

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = ({ navigation, route }: Props) => {
  const { email, code } = route.params;
  const { resetPassword, authLoading } = useAuth();
  const { control, handleSubmit } = useForm<ResetPasswordForm>({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema) as any,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    const response = await resetPassword({
      email,
      token: code,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });

    if (response.success) {
      navigation.navigate('Login', { type: 'patient' });
    }
  };

  return (
    <AuthWrapper text="Reset Password">
      <FormInput
        control={control}
        name="password"
        label="New password"
        placeholder="Enter new password"
        variant="shadowed"
        secureTextEntry
      />

      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm password"
        placeholder="Confirm new password"
        variant="shadowed"
        secureTextEntry
      />

      <AppButton
        title="Reset password"
        onPress={handleSubmit(onSubmit)}
        loading={authLoading}
        variant="primary"
        size="lg"
      />
    </AuthWrapper>
  );
};

export default ResetPasswordScreen;
