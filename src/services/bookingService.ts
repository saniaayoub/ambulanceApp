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
    url: ENDPOINTS.TRIPS.ESTIMATE, // The endpoint URL for the dashboard
    data: payload,
  });

export const getOnlineDrivers = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.DRIVER.ONLINEDRIVERS, // The endpoint URL for the dashboard
    data: payload,
  });

export const createBooking = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.TRIPS.CREATE, // The endpoint URL for the dashboard
    data: payload,
  });
export const cancelBooking = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.BOOKING.CANCEL, // The endpoint URL for the dashboard
    data: payload,
  });

export const stopSearchingTrip = async (payload: string) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.TRIPS.STOP_SEARCH(payload), // The endpoint URL for the dashboard
  });

export const getTripStatus = async (tripId: string) =>
  handleResponse({
    method: 'get', // HTTP method used for the request
    url: ENDPOINTS.BOOKING.STATUS(tripId), // The endpoint URL for the dashboard
  });

export const getTrips = async (params: {
  page: number;
  limit: number;
  status?: string;
}) =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.TRIPS.LIST,
    params,
  });

export const getTripDetail = async (tripId: string) =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.TRIPS.DETAIL(tripId),
  });
export const deleteTrip = async (tripId: string) =>
  handleResponse({
    method: 'delete',
    url: ENDPOINTS.TRIPS.DELETE(tripId),
  });
