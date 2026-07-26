// Utility file for future step-specific sheet content routing

import { useState } from 'react';
import {
  cancelBooking,
  createBooking,
  getEstimateData,
  getOnlineDrivers,
  getTripStatus,
  stopSearchingTrip,
} from '../services/userService';
import { BookingStep, useBookingStore } from '../stores/bookingStore';
import { useLoaderStore } from '../stores/loaderStore';
import { Location } from '../stores/locationStore';
import { getNearbyDrivers } from '../services/locationService';
import { toastError } from '../services/toast';
import { getErrorMessage } from './useAuth';
import { useNavigation } from '@react-navigation/native';
import { queryClient } from '../../App';
// Currently routing is handled directly in BookingScreen component

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
          address: pickup?.address,
        },
        destination: {
          lat: destination?.latitude,
          lng: destination?.longitude,
          address: destination?.address,
        },
        ambulanceType: type,
      };

      const response = await createBooking(payload);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      setTrip(response.data);
      setStep('SEARCHING');
      queryClient.invalidateQueries({ queryKey: ['home-data'] });
      return response;
    } finally {
      hideLoader();
    }
  };

  const handleBookingCancel = async (reason: string, onSuccess?: any) => {
    showLoader();
    try {
      const response = await cancelBooking({
        tripId: trip?.id,
        reason: reason,
      });
      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setTrip(null);
      setStep('');
      queryClient.invalidateQueries({ queryKey: ['home-data'] });
      onSuccess?.();
      if (!onSuccess) {
        navigation?.goBack();
      }
    } finally {
      hideLoader();
    }
  };

  const stopSearching = async from => {
    const fromHome = from === 'fromHome' ? true : false;

    showLoader();
    try {
      const response = await stopSearchingTrip(trip?.id);
      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setTrip(null);
      queryClient.invalidateQueries({ queryKey: ['home-data'] });
      setStep('');
      if (!fromHome) {
        navigation?.goBack();
      }
    } finally {
      hideLoader();
    }
  };

  const getStatus = async () => {
    // showLoader();
    try {
      const response = await getTripStatus();
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
    stopSearching,
    getStatus,
  };
};
