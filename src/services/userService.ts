import { handleResponse } from './authService';
import { ENDPOINTS } from '../api/endpoints';

export const getHomeData = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.USER.DASHBOARD, // The endpoint URL for the dashboard
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
    url: ENDPOINTS.TRIP.ESTIMATE, // The endpoint URL for the dashboard
    data: payload,
  });

export const getOnlineDrivers = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.USER.ONLINEDRIVERS, // The endpoint URL for the dashboard
    data: payload,
  });

export const createBooking = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.TRIP.CREATE, // The endpoint URL for the dashboard
    data: payload,
  });
export const cancelBooking = async (payload: object) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.USER.TRIP_CANCEL, // The endpoint URL for the dashboard
    data: payload,
  });

export const stopSearchingTrip = async (payload: string) =>
  handleResponse({
    method: 'post', // HTTP method used for the request
    url: ENDPOINTS.TRIP.STOP_SEARCH(payload), // The endpoint URL for the dashboard
  });

export const getTripStatus = async () =>
  handleResponse({
    method: 'get', // HTTP method used for the request
    url: ENDPOINTS.USER.TRIP_STATUS, // The endpoint URL for the dashboard
  });

export const getTrips = async (params: {
  page: number;
  limit: number;
  status?: string;
}) =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.TRIP.LIST,
    params,
  });

export const getTripDetail = async (tripId: string) =>
  handleResponse({
    method: 'get',
    url: ENDPOINTS.TRIP.DETAIL(tripId),
  });
export const deleteTrip = async (tripId: string) =>
  handleResponse({
    method: 'delete',
    url: ENDPOINTS.TRIP.DELETE(tripId),
  });
