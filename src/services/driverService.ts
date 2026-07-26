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

////// TRIP

export const tripAccept = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.ACCEPT(tripId),
  });

export const tripReject = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.REJECT(tripId),
  });

export const tripCancel = async (tripId: string, reason: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.CANCEL(tripId),
    data: {
      reason,
    },
  });

export const startTrip = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.START(tripId),
  });

export const completeTrip = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.COMPLETE(tripId),
  });
export const paymentRecieved = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.PAYMENT_RECIEVED(tripId),
  });

export const markDriverArrived = async (tripId: string) =>
  handleResponse({
    method: 'post',
    url: ENDPOINTS.TRIP.ARRIVED(tripId),
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
