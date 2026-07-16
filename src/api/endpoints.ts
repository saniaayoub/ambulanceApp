/**
 * API Endpoints Configuration
 * This file contains all API endpoint URLs used in the application
 */

export const ENDPOINTS = {
  // Authentication Endpoints
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    LOGOUT: 'auth/logout',
    REFRESH_TOKEN: 'auth/refresh',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    VERIFY_OTP: 'auth/verify-otp',
    RESEND_OTP: 'auth/resend-otp',
  },

  // User Endpoints
  USER: {
    PROFILE: 'user/profile',
    UPDATE_PROFILE: 'user/profile',
    CHANGE_PASSWORD: 'user/change-password',
    UPLOAD_AVATAR: 'user/avatar',
  },

  // Home/Dashboard Endpoints
  HOME: {
    DASHBOARD: 'booking/home',
  },

  PROFILE: {
    DRIVER_UPDATE: 'driver/profile',
  },

  DRIVER: {
    ONLINEDRIVERS: 'driver/onlineDrivers',
    DRIVERDETAILS: (driverId: string) => `driver/${driverId}`,
    ONLINESTATUS: `driver/onlineStatus`,
    STATS: 'driver/stats',
    TRIPS: `driver/trips`,
    TRIP_DETAIL: (tripId: string) => `driver/trips/${tripId}`,
    EARNINGS: (period: string) => `/driver/earnings?period=${period}`,
  },

  HOSPITALS: {
    NEARBYHOSPITALS: 'hospitals/nearbyHospitals',
    DETAILS: (placeId: string) => `hospitals/${placeId}`,
  },

  BOOKING: {
    ESTIMATE: 'booking/estimate',
    CREATE: 'booking/create',
    CANCEL: 'booking/cancel',
    STATUS: (tripId: string) => `booking/status/${tripId}`,
  },

  TRIPS: {
    LIST: 'trips',
    LIST_FILTER: 'trips/filter',
    DETAIL: (tripId: string) => `trips/${tripId}`,
    DELETE: (tripId: string) => `trips/${tripId}`,
    ACCEPT: (tripId: string) => `trips/accept/${tripId}`,
    REJECT: (tripId: string) => `trips/reject/${tripId}`,
    ARRIVED: (tripId: string) => `trips/arrived/${tripId}`,
    START: (tripId: string) => `trips/start/${tripId}`,
    COMPLETE: (tripId: string) => `trips/complete/${tripId}`,
    PAYMENT_RECIEVED: (tripId: string) => `trips/payment-received/${tripId}`,
    CANCEL: (tripId: string) => `trips/cancel/${tripId}`,
  },
  // Details/Items Endpoints
  DETAILS: {
    ITEMS: '/items',
    ITEM_DETAILS: (id: string) => `/items/${id}`,
    SEARCH_ITEMS: '/items/search',
  },

  // General Endpoints
  GENERAL: {
    HEALTH_CHECK: '/health',
    CONFIG: '/config',
    UPLOAD_FILE: '/upload',
  },
} as const;
