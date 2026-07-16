import { ENDPOINTS } from '../api/endpoints';
import { handleResponse } from './authService';

export const updateProfile = async (payload: FormData) =>
  handleResponse({
    method: 'patch',
    url: ENDPOINTS.PROFILE.DRIVER_UPDATE,
    data: payload,
  });
