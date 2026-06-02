import { apiCall } from '../api/apiCall';
import { ENDPOINTS } from '../api/endpoints';

export type LoginPayload = {
  email?: string;
  password: string;
  phone?: string | null;
  phone_country?: string | null;
  auth_field: 'email' | 'phone';
  captcha_key?: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string | null;
  phone_country?: string | null;
  auth_field?: 'email';
  captcha_key?: string;
};

export type ForgotPasswordPayload = {
  email: string;
  captcha_key?: string;
};

export type ResetPasswordPayload = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
  auth_field?: 'email' | 'phone';
  phone?: string | null;
  phone_country?: string | null;
  captcha_key?: string;
};

export type AuthResponse<T = any> =
  | { success: true; data: T }
  | { success: false; error: any };

export const handleResponse = async (config: any): Promise<AuthResponse> => {
  try {
    const data = await apiCall(config);
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const login = async (payload: LoginPayload) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.AUTH.LOGIN,
    data: payload,
  });

export const register = async (payload: RegisterPayload) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.AUTH.REGISTER,
    data: {
      name: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      phone: payload.phone ?? null,
      phone_country: payload.phone_country ?? null,
      auth_field: payload.auth_field ?? 'email',
      captcha_key: payload.captcha_key,
    },
  });

export const forgotPassword = async (payload: ForgotPasswordPayload) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.AUTH.FORGOT_PASSWORD,
    data: payload,
  });

export const resetPassword = async (payload: ResetPasswordPayload) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.AUTH.RESET_PASSWORD,
    data: payload,
  });
