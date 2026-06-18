import { handleResponse } from './authService';
import { ENDPOINTS } from '../api/endpoints';

export const getHomeData = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.HOME.DASHBOARD, // The endpoint URL for the dashboard
    data: payload,
  });

export const getHospitalsData = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.HOSPITALS.NEARBYHOSPITALS, // The endpoint URL for the dashboard
    data: payload,
  });

export const getHospitalDetails = async (placeId: string) =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.HOSPITALS.DETAILS(placeId),
  });

export const getEstimateData = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.BOOKING.ESTIMATE, // The endpoint URL for the dashboard
    data: payload,
  });

export const getOnlineDrivers = async (type: string) =>
  handleResponse({
    method: 'get', // HTTP method used for the request
    url: ENDPOINTS.DRIVER.ONLINEDRIVERS, // The endpoint URL for the dashboard
    params: type ? { type } : undefined,
  });

export const createBooking = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.BOOKING.CREATE, // The endpoint URL for the dashboard
    data: payload,
  });
export const cancelBooking = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.BOOKING.CANCEL, // The endpoint URL for the dashboard
    data: payload,
  });

export const getTripStatus = async (tripId: string) =>
  handleResponse({
    method: 'get', // HTTP method used for the request
    url: ENDPOINTS.BOOKING.STATUS(tripId), // The endpoint URL for the dashboard
  });
