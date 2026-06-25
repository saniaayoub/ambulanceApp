import { useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';

import { useDriverSocket } from './useDriverSocket';
import { useLocationStore } from '../stores/locationStore';
import { getLocationName } from '../services/locationService';

const REVERSE_GEOCODE_DISTANCE_METERS = 150;

export const useDriverTracking = (driverId: string, isOnline: boolean) => {
  const watchId = useRef<any>(null);
  const lastGeocodedLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const isGeocodingRef = useRef(false);
  const { emitDriverLocation, isConnected } = useDriverSocket();
  const { setCurrentLocation, currentLocation } = useLocationStore();

  useEffect(() => {
    if (!isOnline) {
      if (watchId.current) {
        Geolocation.clearWatch(watchId.current);
      }
      return;
    }

    watchId.current = Geolocation.watchPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude, 'lo');
        // 1) always update live coordinates immediately
        setCurrentLocation({
          latitude,
          longitude,
          address: currentLocation?.address || '',
          placeName: currentLocation?.placeName || '',
        });

        // 2) emit live location to backend
        if (isConnected) {
          emitDriverLocation({
            driverId,
            lat: latitude,
            lng: longitude,
          });
        }

        // 3) reverse geocode only when driver moved enough
        const nextCoords = { latitude, longitude };

        let shouldReverseGeocode = false;

        if (!lastGeocodedLocationRef.current) {
          shouldReverseGeocode = true;
        } else {
          const movedDistance = getDistance(
            lastGeocodedLocationRef.current,
            nextCoords,
          );

          if (movedDistance >= REVERSE_GEOCODE_DISTANCE_METERS) {
            shouldReverseGeocode = true;
          }
        }

        if (!shouldReverseGeocode || isGeocodingRef.current) return;

        try {
          isGeocodingRef.current = true;

          const formattedAddress = await getLocationName(latitude, longitude);

          setCurrentLocation({
            latitude,
            longitude,
            address: formattedAddress || '',
            placeName: formattedAddress || '', // for now same value
          });

          lastGeocodedLocationRef.current = nextCoords;
        } catch (error) {
          console.log('Reverse geocode error', error);
        } finally {
          isGeocodingRef.current = false;
        }
      },
      error => console.log('Driver tracking error', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 30,
        interval: 4000,
        fastestInterval: 3000,
      },
    );

    return () => {
      if (watchId.current) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [driverId, isOnline, isConnected]);
};
