import polyline from '@mapbox/polyline';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import { PermissionsAndroid, Platform } from 'react-native';
import Config from 'react-native-config';
import { Location } from '../stores/locationStore';
import { handleResponse } from './authService';

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
          console.log(position);

          const { address, placeName } = await getLocationName(
            position.coords.latitude,
            position.coords.longitude,
          );
          console.log(address, placeName);

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

export const getLocationName = async (lat: number, lng: number) => {
  try {
    let poiName = '';

    // ---------- STEP 1 : Nearby Places ----------
    const placesRes = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': Config.API_KEY,
          'X-Goog-FieldMask':
            'places.displayName,places.primaryType,places.formattedAddress',
        },
        body: JSON.stringify({
          maxResultCount: 5,
          locationRestriction: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: 50,
            },
          },
        }),
      },
    );

    const places = (await placesRes.json()).places || [];

    // Ignore roads/intersections
    const usefulPlace = places.find(
      (p: any) =>
        !['route', 'intersection', 'street_address'].includes(p.primaryType),
    );

    console.log(usefulPlace, 'u');
    if (usefulPlace) {
      poiName = usefulPlace.displayName?.text || '';
    }

    // ---------- STEP 2 : Reverse Geocode ----------
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Config.API_KEY}`,
    );

    const geo = await geoRes.json();

    if (!geo.results?.length) {
      return {
        address: poiName || 'Unknown Location',
        placeName: '',
      };
    }

    // ---------- STEP 3 : Pick the best result ----------
    const preferred =
      geo.results.find((r: any) => r.types.includes('premise')) ||
      geo.results.find((r: any) => r.types.includes('subpremise')) ||
      geo.results.find((r: any) => r.types.includes('establishment')) ||
      geo.results.find((r: any) => r.types.includes('point_of_interest')) ||
      geo.results.find((r: any) => r.types.includes('street_address')) ||
      geo.results.find((r: any) => r.types.includes('route')) ||
      geo.results[0];

    const component = (...types: string[]) =>
      preferred.address_components.find((c: any) =>
        types.some(t => c.types.includes(t)),
      )?.long_name;

    const locality =
      component('sublocality_level_1') ||
      component('sublocality') ||
      component('neighborhood') ||
      component('locality') ||
      component('administrative_area_level_2') ||
      component('administrative_area_level_1');

    // Build a readable address when no POI exists
    const address =
      poiName ||
      [
        component('premise'),
        component('subpremise'),
        component('street_number'),
        component('route'),
        component('neighborhood'),
        component('sublocality_level_1'),
      ]
        .filter(Boolean)
        .join(', ') ||
      preferred.formatted_address;

    return {
      address,
      placeName: locality || preferred.formatted_address,
    };
  } catch (error) {
    console.log(error);

    return {
      address: 'Unknown Location',
      placeName: '',
    };
  }
};

// export const getLocationName = async (lat: number, lng: number) => {
//   try {
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${Config.API_KEY}`,
//     );

//     const data = await response.json();

//     const result = data.results?.[0];
//     console.log(result, 'result');
//     if (!result) {
//       return {
//         address: 'Unknown Location',
//         placeName: 'Unknown',
//       };
//     }

//     const getComponent = (...types: string[]) =>
//       result.address_components?.find((component: any) =>
//         types.some(type => component.types.includes(type)),
//       )?.long_name;

//     return {
//       // Short address (shown in ride apps)
//       address:
//         [getComponent('premise', 'street_number'), getComponent('route')]
//           .filter(Boolean)
//           .join(', ') ||
//         getComponent('sublocality_level_1', 'sublocality') ||
//         getComponent('neighborhood') ||
//         getComponent('locality') ||
//         result.formatted_address,

//       // Larger area / city
//       placeName:
//         getComponent('sublocality_level_1', 'sublocality') ||
//         getComponent('neighborhood') ||
//         getComponent('locality') ||
//         getComponent('administrative_area_level_2') ||
//         getComponent('administrative_area_level_1') ||
//         'Unknown',
//     };
//   } catch (error) {
//     console.log('Error:', error);

//     return {
//       address: 'Unknown Location',
//       placeName: 'Unknown',
//     };
//   }
// };
// export const getLocationName = async (lat: number, lng: number) => {
//   try {
//     const apiKey = Config.OPENCAGE_API_KEY;

//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
//     const res = await handleResponse({
//       url,
//       method: 'get',
//     });

//     if (res?.success === false) {
//       return {
//         address: 'Some Location',
//         placeName: 'Unknown',
//       };
//     }

//     const result = res.results[0];

//     return {
//       address: result.formatted ?? 'Some Location',
//       placeName:
//         result.components?.suburb ||
//         result.components?.neighbourhood ||
//         result.components?.city ||
//         result.components?.town ||
//         result.components?.village ||
//         result.components?.county ||
//         'Unknown',
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       address: 'Some Location',
//       placeName: 'Unknown',
//     };
//   }
// };
