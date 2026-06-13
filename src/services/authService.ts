import { apiCall } from '../api/apiCall';
import { ENDPOINTS } from '../api/endpoints';

export type LoginPayload = {
  password: string;
  phone: string | null;
  phone_country?: string | null;
};

export type RegisterPayload = {
  fullName: string;
  password: string;
  phone: string | null;
  phone_country: string | null;
  role: string;
  cnic?: string;
  licenseNumber?: string;
};

export type ForgotPasswordPayload = {
  email: string;
  captcha_key?: string;
};

export type ResetPasswordPayload = {
  idToken: string;
  role: string;
};

export type AuthResponse<T = any> =
  | { success: true; data: T }
  | { success: false; error: any };

export const handleResponse = async (config: any): Promise<AuthResponse> => {
  try {
    const data = await apiCall({ ...config, skipQueue: true });
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
      fullName: payload.fullName,
      password: payload.password,
      phone: payload.phone ?? null,
      phone_country: payload.phone_country ?? null,
      role: payload.role,
      cnic: payload.cnic,
      licenseNumber: payload.licenseNumber,
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

export const logout = async () =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.AUTH.LOGOUT,
  });
export const verifyOtp = async (payload: ResetPasswordPayload) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.AUTH.VERIFY_OTP,
    data: payload,
  });
