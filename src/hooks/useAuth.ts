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
  logout as authLogout,
} from '../services/authService';
// import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { formatPhoneNumber } from '../utils/functions';
import { disconnectSocket } from '../services/driverSocketService';
import { queryClient } from '../../App';

export const getErrorMessage = (error: any) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';

export const useAuth = () => {
  const navigation = useNavigation();
  const {
    token,
    selectedCountry,
    setToken,
    clearToken,
    role,
    setOTPResult,
    otpResult,
    setUserData,
  } = useAuthStore();
  const { showLoader, hideLoader, isLoading } = useLoaderStore();

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
        phone: formatPhoneNumber(
          payload?.phone || '',
          selectedCountry?.dialCode,
        ),
      });

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setToken(response.data.token);
      setUserData(response.data.user);
      queryClient.clear();
      toastSuccess('Logged in successfully');
      return response;
    } finally {
      hideLoader();
    }
  };

  const register = async (payload: RegisterPayload) => {
    const response = await authRegister(payload);
    return response;
  };

  const registerSubmit = async (payload: RegisterPayload) => {
    showLoader();
    try {
      const response = await register({
        ...payload,
        phone: formatPhoneNumber(
          payload?.phone || '',
          selectedCountry?.dialCode,
        ),
      });

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      // toastSuccess('Account created successfully');
      await sendOtp(payload.phone);
      // return response;
    } finally {
      hideLoader();
    }
  };
  // 1️⃣ Send OTP
  const sendOtp = async (phoneNumber: string) => {
    showLoader();

    try {
      // const result = await auth().signInWithPhoneNumber(phoneNumber);
      const result = {};

      setOTPResult(result);
      navigation.navigate('OTPScreen');
      toastSuccess(
        'OTP sent! Please enter the 6 digit code sent to your phone number',
      );
      return result;
    } catch (err) {
      toastError('Failed to send OTP');
    } finally {
      hideLoader();
    }
  };

  // 2️⃣ Verify OTP locally first
  const verifyOtp = async (otp: string) => {
    if (otpResult && otp.length) {
      try {
        const userCredential = await otpResult.confirm(otp);
        const idToken = await userCredential.user.getIdToken(); // Firebase ID token

        // Send this token to your backend for verification
        const response = await authVerifyOtp({ idToken: idToken, role: role });
        if (!response.success) {
          toastError(getErrorMessage(response.error));
          return response;
        }
        toastSuccess('Account registered successfully');
        setToken(response.data.token);
        return response;
      } catch (err) {
        toastError('Failed to verify OTP');

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

  const logout = async () => {
    showLoader();
    try {
      const response = await authLogout();

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      disconnectSocket();
      clearToken();
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
    logout,
  };
};
