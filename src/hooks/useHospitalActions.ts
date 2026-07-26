import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getHospitalDetails } from '../services/userService';
import { useBookingStore } from '../stores/bookingStore';
import { useLocationStore } from '../stores/locationStore';
import { makeaCall } from '../utils/functions';
import { toastError } from '../services/toast';

export const useHospitalActions = (navigation?: any) => {
  const { currentLocation } = useLocationStore();

  const {
    trip,
    setPickupLocation,
    setDestinationLocation,
    startBooking,
    setStep,
  } = useBookingStore();

  /**
   * 🚑 START BOOKING (used in Home + Hospitals + Map)
   */
  const startHospitalBooking = useCallback(
    (hospital: any) => {
      if (!hospital) return;
      if (trip) {
        toastError('Already in a trip');
        return;
      }

      startBooking();
      setStep('TRIP');

      setPickupLocation(currentLocation);

      setDestinationLocation({
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        address: hospital.name,
        placeName: hospital.name,
      });

      navigation?.navigate?.('BookingScreen');
    },
    [currentLocation, navigation],
  );

  /**
   * 📞 CALL HOSPITAL
   */
  const { mutate: fetchHospitalPhone } = useMutation({
    mutationFn: getHospitalDetails,
    onSuccess: res => makeaCall(res?.data?.phone),
  });

  const callHospital = useCallback((placeId: string) => {
    if (!placeId) return;
    fetchHospitalPhone(placeId);
  }, []);

  return {
    startHospitalBooking,
    callHospital,
    makeaCall,
  };
};
