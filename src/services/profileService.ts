import { ENDPOINTS } from '../api/endpoints';
import { Roles } from '../utils/enums';
import { handleResponse } from './authService';

export const updateProfile = async (payload: FormData, role?: string) =>
  handleResponse({
    method: 'patch',
    url:
      role === Roles.DRIVER
        ? ENDPOINTS.PROFILE.DRIVER_UPDATE
        : ENDPOINTS.PROFILE.USER_PROFILE,
    data: payload,
  });
