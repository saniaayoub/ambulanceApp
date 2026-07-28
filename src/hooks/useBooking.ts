// Utility file for future step-specific sheet content routing

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { queryClient } from '../../App';
import { toastError, toastSuccess } from '../services/toast';
import {
  cancelBooking,
  createBooking,
  getEstimateData,
  getOnlineDrivers,
  getTripStatus,
  stopSearchingTrip,
  submitReview,
} from '../services/userService';
import { useBookingStore } from '../stores/bookingStore';
import { useLoaderStore } from '../stores/loaderStore';
import { Location } from '../stores/locationStore';
import { getErrorMessage } from './useAuth';
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

  const stopSearching = async (from?: string) => {
    const fromHome = from === 'fromHome' ? true : false;

    showLoader();
    try {
      const response = await stopSearchingTrip(trip?.id);
      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setTrip(null);
      setStep('');
      queryClient.invalidateQueries({ queryKey: ['home-data'] });
      if (!fromHome) {
        navigation?.goBack();
      }
    } finally {
      hideLoader();
    }
  };

  const submitReviewHandler = async (payload: any) => {
    showLoader();
    try {
      const response = await submitReview(payload);
      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setTrip(null);
      setStep('');
      queryClient.invalidateQueries({ queryKey: ['home-data'] });
      toastSuccess('Thank you for your feedback', 'Review Submitted');
      navigation?.goBack();
    } finally {
      hideLoader();
    }
  };

  return {
    getEstimate,
    getOnlineDriversList,
    handleCreateBooking,
    handleBookingCancel,
    drivers,
    stopSearching,
    submitReviewHandler,
  };
};
