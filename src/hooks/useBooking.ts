// Utility file for future step-specific sheet content routing

import { useState } from 'react';
import {
  cancelBooking,
  createBooking,
  getEstimateData,
  getOnlineDrivers,
  getTripStatus,
} from '../services/bookingService';
import { BookingStep, useBookingStore } from '../stores/bookingStore';
import { useLoaderStore } from '../stores/loaderStore';
import { Location } from '../stores/locationStore';
import { getNearbyDrivers } from '../services/locationService';
import { toastError } from '../services/toast';
import { getErrorMessage } from './useAuth';
import { useNavigation } from '@react-navigation/native';
// Currently routing is handled directly in BookingScreen component
export const bookingSteps: BookingStep[] = [
  'Pickup',
  'Destination',
  'Trip Details',
  'Searching',
  'Driver Assigned',
  'Tracking',
  'Completed',
];

type EstimatePayload = {
  pickupLocation: Location;
  destination: Location;
  ambulanceType: string;
};

export const useBooking = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoaderStore();
  const setTrip = useBookingStore(state => state.setTrip);
  const setStep = useBookingStore(state => state.setStep);

  const trip = useBookingStore(state => state.trip);

  const [drivers, setDrivers] = useState([]);

  const getEstimate = async (payload: EstimatePayload) => {
    showLoader();
    try {
      const response = await getEstimateData(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      return response.data;
    } finally {
      hideLoader();
    }
  };

  const getOnlineDriversList = async (type: string, pickup: Location) => {
    showLoader();
    try {
      const response = await getOnlineDrivers({ pickup, type });
      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      setDrivers(response.data);
    } finally {
      hideLoader();
    }
  };

  const handleCreateBooking = async (
    pickup: Location,
    destination: Location,
    type: string,
  ) => {
    showLoader();
    try {
      const payload = {
        pickupLocation: {
          lat: pickup?.latitude,
          lng: pickup?.longitude,
        },
        destination: {
          lat: destination?.latitude,
          lng: destination?.longitude,
        },
        ambulanceType: type,
      };

      const response = await createBooking(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      setTrip(response.data);

      return response;
    } finally {
      hideLoader();
    }
  };

  const handleBookingCancel = async () => {
    showLoader();
    try {
      const response = await cancelBooking({ tripId: trip?.id });
      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setTrip(null);
      navigation.goBack();
      setStep('');
    } finally {
      hideLoader();
    }
  };

  const getStatus = async () => {
    // showLoader();
    try {
      const response = await getTripStatus(trip?.id);
      return response?.data;
    } finally {
      // hideLoader();
    }
  };

  return {
    getEstimate,
    getOnlineDriversList,
    handleCreateBooking,
    handleBookingCancel,
    drivers,
    getStatus,
  };
};
