import { useAuthStore } from '../stores/authStore';
import { useLoaderStore } from '../stores/loaderStore';
import { toastError, toastSuccess } from '../services/toast';
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  login as authLogin,
  register as authRegister,
  forgotPassword as authForgotPassword,
  resetPassword as authResetPassword,
  verifyOtp as authVerifyOtp,
} from '../services/authService';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

const getErrorMessage = (error: any) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';

export const useAuth = () => {
  const { token, setToken, clearToken } = useAuthStore();
  const { showLoader, hideLoader, isLoading } = useLoaderStore();

  const [confirmResult, setConfirmResult] = useState(null);
  const [message, setMessage] = useState('');
  const login = async (payload: LoginPayload) => {
    const response = await authLogin(payload);

    if (response.success && response.data?.token) {
      setToken(response.data.token);
    }

    return response;
  };

  const loginSubmit = async (payload: LoginPayload) => {
    showLoader();
    try {
      const response = await login({
        ...payload,
        phone: payload.phone ?? null,
        phone_country: payload.phone_country ?? null,
      });

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      toastSuccess('Logged in successfully');
      return response;
    } finally {
      hideLoader();
    }
  };

  const register = async (payload: RegisterPayload) => {
    const response = await authRegister(payload);

    if (response.success && response.data?.token) {
      setToken(response.data.token);
    }

    return response;
  };

  const registerSubmit = async (payload: RegisterPayload) => {
    showLoader();
    try {
      const response = await register(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      toastSuccess('Account created successfully');
      return response;
    } finally {
      hideLoader();
    }
  };
  // 1️⃣ Send OTP
  const sendOtp = async (phoneNumber: string) => {
    try {
      const result = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(result, 'result otp');

      if (!result?.success) {
        toastError(getErrorMessage(result?.error));
        return result;
      }
      setConfirmResult(result);
      setMessage('OTP sent!');
      // toastSuccess('Account created successfully');
      toastSuccess('OTP sent!');
      return result;
    } catch (err) {
      console.log(err);

      setMessage('Failed to send OTP');
    }
  };

  // 2️⃣ Verify OTP locally first
  const verifyOtp = async (otp: string) => {
    if (confirmResult && otp.length) {
      try {
        const userCredential = await confirmResult.confirm(otp);
        const idToken = await userCredential.user.getIdToken(); // Firebase ID token
        console.log('Firebase ID Token:', idToken);

        // Send this token to your backend for verification
        const response = await authVerifyOtp(idToken);
        if (!response.success) {
          toastError(getErrorMessage(response.error));
          return response;
        }
        toastSuccess('Password reset link sent');
        return response;
      } catch (err) {
        console.log(err);
        // setMessage('Invalid OTP');
      }
    }
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    showLoader();
    try {
      const response = await authForgotPassword(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      toastSuccess('Password reset link sent');
      return response;
    } finally {
      hideLoader();
    }
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    showLoader();
    try {
      const response = await authResetPassword(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      toastSuccess('Password has been reset');
      return response;
    } finally {
      hideLoader();
    }
  };

  return {
    token,
    setToken,
    clearToken,
    login,
    register,
    loginSubmit,
    registerSubmit,
    forgotPassword,
    resetPassword,
    sendOtp,
    verifyOtp,
    authLoading: isLoading,
  };
};
