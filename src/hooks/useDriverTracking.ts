import { useEffect, useRef } from 'react';
import { socket } from '../services/socketService';
import Geolocation from '@react-native-community/geolocation';

export const useDriverTracking = (driverId: string, isOnline: boolean) => {
  const watchId = useRef<any>(null);
  // console.log(driverId, isOnline, 'hh');
  useEffect(() => {
    if (!isOnline) {
      if (watchId.current) {
        Geolocation.clearWatch(watchId.current);
      }
      return;
    }

    watchId.current = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude, 'lat lng');
        socket.emit('driver_location_update', {
          driverId,
          lat: latitude,
          lng: longitude,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 20,
        interval: 4000,
      },
    );

    return () => {
      if (watchId.current) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [driverId, isOnline]);
};
