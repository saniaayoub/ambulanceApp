import { useCallback } from 'react';
import { Linking } from 'react-native';
import { useBookingStore } from '../stores/bookingStore';
import { useLocation } from './useLocation';
import { useMutation } from '@tanstack/react-query';
import { getHospitalDetails } from '../services/bookingService';

export const useHospitalActions = (navigation?: any) => {
  const { currentLocation } = useLocation();

  const { setPickupLocation, setDestinationLocation, startBooking, setStep } =
    useBookingStore();

  /**
   * 🚑 START BOOKING (used in Home + Hospitals + Map)
   */
  const startHospitalBooking = useCallback(
    (hospital: any) => {
      if (!hospital) return;

      startBooking();
      setStep('Trip Details');

      setPickupLocation(currentLocation);

      setDestinationLocation({
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        name: hospital.name,
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
    onSuccess: res => {
      const phone = res?.data?.phone;
      if (phone) {
        Linking.openURL(`tel:${phone}`);
      }
    },
  });

  const callHospital = useCallback((placeId: string) => {
    if (!placeId) return;
    fetchHospitalPhone(placeId);
  }, []);

  return {
    startHospitalBooking,
    callHospital,
  };
};
