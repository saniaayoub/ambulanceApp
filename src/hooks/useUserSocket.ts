import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { queryClient } from '../../App';
import { BaseURL } from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';
import { useBookingStore } from '../stores/bookingStore';
import { TRIP_STATUS } from '../utils/enums';
export let userSocketInstance: Socket | null = null;

export const getUserSocket = () => userSocketInstance;

export const useUserSocket = () => {
  const token = useAuthStore(state => state.token);
  const currentUser = useAuthStore(state => state.userData);
  const hasHydrated = useAuthStore(state => state.hasHydrated);

  const { setTrip, setDriverLocation, setStep, resetBooking } =
    useBookingStore();
  const navigation = useNavigation();

  const hasJoinedRef = useRef(false);
  const lastJoinedRoomRef = useRef<string | null>(null);

  const resolvedUserId =
    currentUser?.id ||
    currentUser?._id ||
    currentUser?.userId?._id ||
    currentUser?.userId ||
    null;

  const resolvedRole = currentUser?.role?.toLowerCase();
  useEffect(() => {
    if (!hasHydrated) return;
    if (!token) return;
    if (resolvedRole !== 'user') return;

    if (!userSocketInstance) {
      userSocketInstance = io(BaseURL, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
      });
    }

    const socket = userSocketInstance;

    const onConnect = async () => {
      console.log('✅ User Socket Connected');

      hasJoinedRef.current = false;
    };

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [token, hasHydrated]);

  useEffect(() => {
    if (!userSocketInstance) return;
    if (!resolvedUserId) return;
    if (resolvedRole !== 'user') return;

    const room = `${resolvedRole}:${resolvedUserId}`;

    if (hasJoinedRef.current && lastJoinedRoomRef.current === room) return;

    hasJoinedRef.current = true;
    lastJoinedRoomRef.current = room;

    userSocketInstance.emit('join', {
      userId: resolvedUserId,
      role: 'user',
    });
  }, [resolvedUserId]);

  useEffect(() => {
    if (!userSocketInstance) return;

    const socket = userSocketInstance;
    const onTripStatusUpdated = trip => {
      queryClient.invalidateQueries({ queryKey: ['home-data'] });

      if (trip.status === TRIP_STATUS.CANCELLED) {
        resetBooking();
        setTrip(null);
        // navigation.goBack();
        Alert.alert('Driver has cancelled the trip');
        return;
      }

      setTrip(trip);
      setStep(trip.status);

      // if (['COMPLETED', 'CANCELLED'].includes(trip.status)) {
      //   resetBooking();
      // }
    };

    const onDriverLocationUpdate = location => {
      setDriverLocation(location);
    };

    socket.on('trip_status_updated', onTripStatusUpdated);
    socket.on('driver_location_changed', onDriverLocationUpdate);

    return () => {
      socket.off('trip_status_updated', onTripStatusUpdated);
      socket.off('driver_location_changed', onDriverLocationUpdate);
    };
  }, []);
};
