import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import Config from 'react-native-config';
import polyline from '@mapbox/polyline';
import { Location } from '../stores/locationStore';
import axios from 'axios';
import { apiCall } from '../api/apiCall';
import { handleResponse } from './authService';
import { getDistance } from 'geolib';

export const getNearbyDrivers = async (drivers: any[], pickup: Location) => {
  const nearbyDrivers = drivers.map(item => ({
    ...item,
    distance: getDistance(
      { lat: pickup?.latitude, lng: pickup?.longitude },
      {
        lat: item.driver.currentLocation.lat,
        lng: item.driver.currentLocation.lng,
      },
    ),
  }));
  return nearbyDrivers;
};
export const fetchRoute = async (pickup: Location, destination: Location) => {
  let mode = 'driving';
  let alternative = true;

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${destination.latitude},${destination.longitude}&mode=${mode}&alternatives=${alternative}&key=${Config.API_KEY}`;
  try {
    const res = await handleResponse({
      method: 'get',
      url: url,
    });

    const points = polyline.decode(res.routes[0].overview_polyline.points);

    const coords = points.map(([lat, lng]) => ({
      latitude: lat,
      longitude: lng,
    }));

    return coords;
  } catch (error) {
    console.log(error, 'polyline error');

    return [];
  }
};
export const getCurrentLocation = async (): Promise<Location> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const { address, placeName } = await getLocationName(
            position.coords.latitude,
            position.coords.longitude,
          );

          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address,
            placeName,
          });
        } catch (error) {
          reject(error);
        }
      },
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );
  });
export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your location to show nearby services',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true;
};

// export const getLocationName = async (lat: number, lng: number) => {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${APIKey}`,
//     );
//     const data = await response.json();
//     console.log(data, 'res');

//     const address = data.results?.[0]?.formatted_address;

//     console.log('Location Name:', address);
//     return address;
//   } catch (error) {
//     console.log('Error:', error);
//   }
// };

export const getLocationName = async (lat: number, lng: number) => {
  try {
    const apiKey = Config.OPENCAGE_API_KEY;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    const res = await handleResponse({
      url,
      method: 'get',
    });

    if (res?.success === false) {
      return {
        address: 'Some Location',
        placeName: 'Unknown',
      };
    }

    const result = res.results[0];

    return {
      address: result.formatted ?? 'Some Location',
      placeName:
        result.components?.suburb ||
        result.components?.neighbourhood ||
        result.components?.city ||
        result.components?.town ||
        result.components?.village ||
        result.components?.county ||
        'Unknown',
    };
  } catch (error) {
    console.log(error);

    return {
      address: 'Some Location',
      placeName: 'Unknown',
    };
  }
};
