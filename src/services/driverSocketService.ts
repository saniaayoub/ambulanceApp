import { socketInstance } from '../hooks/useDriverSocket';

export const isSocketConnected = () => {
  return !!socketInstance?.connected;
};

export const emitDriverLocation = ({
  userId,
  driverId,
  lat,
  lng,
}: {
  userId: string;
  driverId: string;
  lat: number | any;
  lng: number | any;
}) => {
  if (!socketInstance?.connected) return;
  socketInstance.emit('driver_location_update', {
    userId,
    driverId,
    lat,
    lng,
  });
};

export const emitAcceptTrip = (tripId: string) => {
  if (!socketInstance?.connected) return;

  socketInstance.emit('accept_trip', { tripId });
};

export const emitRejectTrip = (tripId: string, reason?: string) => {
  if (!socketInstance?.connected) return;

  socketInstance.emit('reject_trip', {
    tripId,
    reason,
  });
};

export const emitArrived = (tripId: string) => {
  if (!socketInstance?.connected) return;

  socketInstance.emit('trip_arrived', {
    tripId,
  });
};

export const emitStartTrip = (tripId: string) => {
  if (!socketInstance?.connected) return;

  socketInstance.emit('start_trip', {
    tripId,
  });
};

export const emitCompleteTrip = (tripId: string) => {
  if (!socketInstance?.connected) return;

  socketInstance.emit('complete_trip', {
    tripId,
  });
};

export const emitDriverAvailability = (userId: string, isOnline: boolean) => {
  if (!socketInstance?.connected) return;

  socketInstance.emit('driver_availability_update', {
    userId,
    isOnline,
  });
};

export const disconnectSocket = () => {
  socketInstance?.disconnect();
};
