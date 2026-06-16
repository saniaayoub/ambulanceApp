// Utility file for future step-specific sheet content routing

import { getEstimateData } from '../services/bookingService';
import { BookingStep } from '../stores/bookingStore';
import { useLoaderStore } from '../stores/loaderStore';
import { Location } from '../stores/locationStore';

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

export const useBookingData = () => {
  const { showLoader, hideLoader } = useLoaderStore();

  const getEstimate = async (payload: EstimatePayload) => {
    showLoader();
    console.log(payload, 'payload');
    const data = await getEstimateData(payload);
    console.log(data);
    hideLoader();
  };

  return {
    getEstimate,
  };
};
