import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
// import your zustand auth store
import { useAuthStore } from '../stores/authStore'; // <-- change path
import { BaseURL } from '../api/axiosInstance';
import { useDriverStore } from '../stores/driverStore';
// import your trip/driver store if needed
// import { useTripStore } from '../store/tripStore';

const SOCKET_URL = 'http://YOUR_SERVER_URL:5000'; // <-- change this

type JoinPayload = {
  userId: string;
  role: 'driver' | 'user' | 'admin';
};

type DriverLocationPayload = {
  driverId?: string;
  lat: number;
  lng: number;
  //   heading?: number;
  //   speed?: number;
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

let socketInstance: Socket | null = null;

export const getDriverSocket = () => socketInstance;

export const useDriverSocket = () => {
  const currentUser = useAuthStore(state => state.userData);
  const token = useAuthStore(state => state.token);
  const setIncomingRequest = useDriverStore(state => state.setIncomingRequest);

  const hasHydrated = useAuthStore(state => state.hasHydrated); // if you have this in zustand
  // const setIncomingTrip = useTripStore(state => state.setIncomingTrip);
  // const setTripStatus = useTripStore(state => state.setTripStatus);

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
        auth: {
          token, // optional if backend reads token from socket.handshake.auth.token
        },
        extraHeaders: {
          Authorization: `Bearer ${token}`, // useful if backend supports it
        },
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

      // Example:
      setIncomingRequest(trip);

      // If you want a local notification / sound, trigger it here
      // playIncomingTripSound();
    };

    const onTripCancelled = (payload: TripCancelledPayload) => {
      console.log('❌ trip_cancelled =>', payload);

      // Example:
      // setTripStatus({ tripId: payload.tripId, status: 'CANCELLED' });
    };

    const onTripStatusUpdated = (payload: TripStatusPayload) => {
      console.log('📌 trip_status_updated =>', payload);

      // Example:
      // setTripStatus(payload);
    };

    const onDriverApproved = (payload: any) => {
      console.log('✅ driver_approved =>', payload);
    };

    const onDriverRejected = (payload: any) => {
      console.log('⛔ driver_rejected =>', payload);
    };

    // ===== REGISTER LISTENERS =====
    socket.on('incoming_trip_request', onIncomingTrip);
    socket.on('trip_cancelled', onTripCancelled);
    socket.on('trip_status_updated', onTripStatusUpdated);
    socket.on('driver_approved', onDriverApproved);
    socket.on('driver_rejected', onDriverRejected);

    return () => {
      socket.off('incoming_trip_request', onIncomingTrip);
      socket.off('trip_cancelled', onTripCancelled);
      socket.off('trip_status_updated', onTripStatusUpdated);
      socket.off('driver_approved', onDriverApproved);
      socket.off('driver_rejected', onDriverRejected);
    };
  }, []);

  /**
   * Emit driver location update
   */
  const emitDriverLocation = useCallback(
    (payload: DriverLocationPayload) => {
      if (!socketInstance?.connected) {
        console.log('⚠️ emitDriverLocation skipped: socket not connected');
        return;
      }

      const finalPayload = {
        driverId: payload.driverId || resolvedUserId, // adjust if backend expects driverId instead of userId
        lat: payload.lat,
        lng: payload.lng,
        // heading: payload.heading,
        // speed: payload.speed,
      };

      console.log('📍 driver_location_update =>', finalPayload);
      socketInstance.emit('driver_location_update', finalPayload);
    },
    [resolvedUserId],
  );

  /**
   * Emit driver online/offline status if you want via socket too
   */
  const emitDriverAvailability = useCallback(
    (isOnline: boolean) => {
      if (!socketInstance?.connected) {
        console.log('⚠️ emitDriverAvailability skipped: socket not connected');
        return;
      }

      const payload = {
        userId: resolvedUserId,
        isOnline,
      };

      console.log('🟢 driver_availability_update =>', payload);
      socketInstance.emit('driver_availability_update', payload);
    },
    [resolvedUserId],
  );

  /**
   * Accept trip
   */
  const emitAcceptTrip = useCallback((tripId: string) => {
    if (!socketInstance?.connected) {
      console.log('⚠️ emitAcceptTrip skipped: socket not connected');
      return;
    }

    socketInstance.emit('accept_trip', { tripId });
  }, []);

  /**
   * Arrive at pickup
   */
  const emitArrived = useCallback((tripId: string) => {
    if (!socketInstance?.connected) return;
    socketInstance.emit('trip_arrived', { tripId });
  }, []);

  /**
   * Start trip
   */
  const emitStartTrip = useCallback((tripId: string) => {
    if (!socketInstance?.connected) return;
    socketInstance.emit('start_trip', { tripId });
  }, []);

  /**
   * Complete trip
   */
  const emitCompleteTrip = useCallback((tripId: string) => {
    if (!socketInstance?.connected) return;
    socketInstance.emit('complete_trip', { tripId });
  }, []);

  /**
   * Reject trip
   */
  const emitRejectTrip = useCallback((tripId: string, reason?: string) => {
    if (!socketInstance?.connected) return;
    socketInstance.emit('reject_trip', { tripId, reason });
  }, []);

  /**
   * Manual disconnect if needed on logout
   */
  const disconnectSocket = useCallback(() => {
    if (socketInstance) {
      console.log('🔌 Disconnecting driver socket');
      socketInstance.disconnect();
      hasJoinedRef.current = false;
      lastJoinedRoomRef.current = null;
    }
  }, []);

  return {
    socket: socketInstance,
    isConnected: !!socketInstance?.connected,

    emitDriverLocation,
    emitDriverAvailability,
    emitAcceptTrip,
    emitArrived,
    emitStartTrip,
    emitCompleteTrip,
    emitRejectTrip,
    disconnectSocket,
  };
};
