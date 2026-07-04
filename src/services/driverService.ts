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

////// TRIPS

export const tripAccept = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.ACCEPT(tripId),
  });

export const tripReject = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.REJECT(tripId),
  });

export const tripCancel = async (tripId: string, reason: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.CANCEL(tripId),
    data: {
      reason,
    },
  });

export const startTrip = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.START(tripId),
  });

export const completeTrip = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.COMPLETE(tripId),
  });
export const paymentRecieved = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.PAYMENT_RECIEVED(tripId),
  });

export const markDriverArrived = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIPS.ARRIVED(tripId),
  });

export const getDriverTrips = (params: {
  page: number;
  limit: number;
  status?: string;
}) => {
  return handleResponse({
    method: 'get',
    url: ENDPOINTS.DRIVER.TRIPS,
    params,
  });
};

export const getDriverTripDetail = (tripId: string) => {
  return handleResponse({
    method: 'get',
    url: ENDPOINTS.DRIVER.TRIP_DETAIL(tripId),
  });
};

export const getDriverEarnings = (period: string) => {
  return handleResponse({
    method: 'get',
    url: ENDPOINTS.DRIVER.EARNINGS(period),
  });
};
