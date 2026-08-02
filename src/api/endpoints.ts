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
    DASHBOARD: 'user/home',
    ESTIMATE: 'user/estimate',
    CREATE: 'user/create',
    TRIP_CANCEL: 'user/cancelTrip',
    SUBMIT_REVIEW: 'user/submitReview',
    ONLINEDRIVERS: 'user/onlineDrivers',
  },

  PROFILE: {
    DRIVER_UPDATE: 'driver/profile',
    USER_PROFILE: 'user/profile',
  },

  DRIVER: {
    DRIVERDETAILS: (driverId: string) => `driver/${driverId}`,
    ONLINESTATUS: `driver/onlineStatus`,
    STATS: 'driver/stats',
    TRIPS: `driver/trips`,
    TRIP_DETAIL: (tripId: string) => `driver/trip/${tripId}`,
    EARNINGS: (period: string) => `/driver/earnings?period=${period}`,
  },

  HOSPITALS: {
    NEARBYHOSPITALS: 'hospitals/nearbyHospitals',
    DETAILS: (placeId: string) => `hospitals/${placeId}`,
  },

  TRIP: {
    LIST: 'trip',
    LIST_FILTER: 'trip/filter',
    ESTIMATE: 'trip/estimate',
    CREATE: 'trip/create',
    STOP_SEARCH: (tripId: string) => `trip/stopSearch/${tripId}`,
    DETAIL: (tripId: string) => `trip/${tripId}`,
    DELETE: (tripId: string) => `trip/${tripId}`,
    ACCEPT: (tripId: string) => `trip/accept/${tripId}`,
    REJECT: (tripId: string) => `trip/reject/${tripId}`,
    ARRIVED: (tripId: string) => `trip/arrived/${tripId}`,
    START: (tripId: string) => `trip/start/${tripId}`,
    COMPLETE: (tripId: string) => `trip/complete/${tripId}`,
    PAYMENT_RECIEVED: (tripId: string) => `trip/payment-received/${tripId}`,
    CANCEL: (tripId: string) => `trip/cancel/${tripId}`,
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
