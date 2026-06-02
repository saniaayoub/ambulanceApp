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
} from '../services/authService';

const getErrorMessage = (error: any) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';

export const useAuth = (defaultAuthField: 'email' | 'phone' = 'email') => {
  const { token, setToken, clearToken } = useAuthStore();
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
        auth_field: payload.auth_field || defaultAuthField,
        phone: payload.phone ?? null,
        phone_country: payload.phone_country ?? null,
        captcha_key: payload.captcha_key ?? 'accusamus',
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
    authLoading: isLoading,
  };
};
