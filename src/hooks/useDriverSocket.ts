import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { BaseURL } from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore'; // <-- change path
import { useDriverStore } from '../stores/driverStore';
import { queryClient } from '../../App';

type JoinPayload = {
  userId: string;
  role: 'driver' | 'user' | 'admin';
};

type IncomingTripPayload = {
  _id: string;
  pickupLocation?: any;
  destinationLocation?: any;
  ambulanceType?: string;
  [key: string]: any;
};

type TripCancelledPayload = {
  tripId: string;
  reason?: string;
};

type TripStatusPayload = {
  tripId: string;
  status: string;
  [key: string]: any;
};

export let socketInstance: Socket | null = null;

export const getDriverSocket = () => socketInstance;

export const useDriverSocket = () => {
  const currentUser = useAuthStore(state => state.userData);
  const token = useAuthStore(state => state.token);
  const setIncomingRequest = useDriverStore(state => state.setIncomingRequest);
  const setCurrentTrip = useDriverStore(state => state.setIncomingRequest);
  const setTripStep = useDriverStore(state => state.setTripStep);
  const setTripTracking = useDriverStore(state => state.setTripTracking);

  const hasHydrated = useAuthStore(state => state.hasHydrated); // if you have this in zustand

  const hasJoinedRef = useRef(false);
  const lastJoinedRoomRef = useRef<string | null>(null);

  /**
   * Resolve the actual user id from your auth object.
   * IMPORTANT: adjust this if your currentUser shape is different.
   */
  const resolvedUserId =
    currentUser?._id || currentUser?.userId?._id || currentUser?.userId || null;

  const resolvedRole =
    typeof currentUser?.role === 'string'
      ? currentUser.role.toLowerCase()
      : null;

  /**
   * Create socket once
   */
  useEffect(() => {
    if (!hasHydrated) return;
    if (!token) return;

    if (!socketInstance) {
      socketInstance = io(BaseURL, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        timeout: 20000,
        // auth: {
        //   token, // optional if backend reads token from socket.handshake.auth.token
        // },
        // extraHeaders: {
        //   Authorization: `Bearer ${token}`, // useful if backend supports it
        // },
      });
    } else {
      // keep token fresh if socket already exists and user logs in again
      socketInstance.auth = { token };
      if (!socketInstance.connected) {
        socketInstance.connect();
      }
    }

    const socket = socketInstance;

    const onConnect = () => {
      console.log('✅ Driver socket connected:', socket.id);
      // reset join flag on a fresh connect so room can be joined again
      hasJoinedRef.current = false;
    };

    const onDisconnect = (reason: string) => {
      console.log('❌ Driver socket disconnected:', reason);
      hasJoinedRef.current = false;
    };

    const onConnectError = (error: any) => {
      console.log('🚨 Driver socket connect_error:', error?.message || error);
    };

    const onReconnectAttempt = (attempt: number) => {
      console.log('🔄 Driver socket reconnect attempt:', attempt);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.io.on('reconnect_attempt', onReconnectAttempt);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.io.off('reconnect_attempt', onReconnectAttempt);
    };
  }, [token, hasHydrated]);

  /**
   * Join driver room once socket is connected AND current user is available.
   * This fixes your current issue where connect happens before currentUser is ready.
   */
  useEffect(() => {
    if (!hasHydrated) return;
    if (!socketInstance) return;
    if (!resolvedUserId) return;
    if (!resolvedRole) return;

    const roomKey = `${resolvedRole}:${resolvedUserId}`;
    // avoid duplicate join spam for same room
    const alreadyJoinedSameRoom =
      hasJoinedRef.current && lastJoinedRoomRef.current === roomKey;
    console.log(alreadyJoinedSameRoom, 'alreadyJoinedSameRoom');
    if (alreadyJoinedSameRoom) return;

    const payload: JoinPayload = {
      userId: resolvedUserId,
      role: resolvedRole as JoinPayload['role'],
    };
    hasJoinedRef.current = true;
    lastJoinedRoomRef.current = roomKey;
    console.log('📨 Emitting join:s', payload);
    socketInstance.emit('join', payload);
  }, [hasJoinedRef.current, resolvedUserId, resolvedRole, socketInstance]);

  /**
   * Register driver-side event listeners once.
   * Put all server events related to driver here.
   */
  useEffect(() => {
    if (!socketInstance) return;
    console.log('📨 Registering driver event listeners');
    const socket = socketInstance;

    const onIncomingTrip = (trip: IncomingTripPayload) => {
      console.log('🚑 incoming_trip =>', trip);
      setIncomingRequest(trip);

      // If you want a local notification / sound, trigger it here
      // playIncomingTripSound();
    };
    const onTripRequestTaken = ({ tripId }) => {
      const request = useDriverStore.getState().incomingRequest;
      console.log('clear incoming');
      if (request?.tripId === tripId) {
        setIncomingRequest(null);
      }
    };

    const onTripCancelled = (payload: TripCancelledPayload) => {
      console.log('❌ trip_cancelled =>', payload);

      // Example:
      setCurrentTrip(null);
      setTripStep('idle');
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });
    };

    const onTripStatusUpdated = (payload: TripStatusPayload) => {
      console.log('📌 trip_tracking_updated =>', payload);

      // Example:
      setTripTracking(payload);
    };

    // ===== REGISTER LISTENERS =====
    socket.on('incoming_trip_request', onIncomingTrip);
    socket.on('trip_request_taken', onTripRequestTaken);
    socket.on('trip_search_stopped', onTripRequestTaken);
    socket.on('trip_cancelled', onTripCancelled);
    socket.on('trip_tracking_updated', onTripStatusUpdated);

    return () => {
      socket.off('incoming_trip_request', onIncomingTrip);
      socket.off('trip_request_taken', onTripRequestTaken);
      socket.off('trip_search_stopped', onTripRequestTaken);
      socket.off('trip_cancelled', onTripCancelled);
      socket.off('trip_tracking_updated', onTripStatusUpdated);
    };
  }, []);
};
