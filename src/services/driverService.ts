import { ENDPOINTS } from '../api/endpoints';
import { handleResponse } from './authService';

export const getDriver = async (driverId: string) =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.DRIVER.DRIVERDETAILS(driverId),
  });

export const getDriverStats = async () =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.DRIVER.STATS,
  });

export const toggleOnlineStatus = async () =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.DRIVER.ONLINESTATUS,
  });
