import {
  getCurrentLocation,
  getLocationName,
  requestLocationPermission,
} from '../services/locationService';
import { toastError } from '../services/toast';
import { useLoaderStore } from '../stores/loaderStore';
import { Location, useLocationStore } from '../stores/locationStore';

export const useLocation = () => {
  const { setCurrentLocation } = useLocationStore();
  const { showLoader, hideLoader } = useLoaderStore();

  const fetchCurrentLocation = async () => {
    try {
      showLoader();

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const location = await getCurrentLocation();

      setCurrentLocation(location);

      return location;
    } catch (error) {
      toastError('Unable to fetch current location');
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const changeLocation = async (
    lat: number,
    lng: number,
    setLocation?: (location: Location) => void,
  ) => {
    showLoader();

    const { address, placeName } = await getLocationName(lat, lng);

    const customizeLoc: Location = {
      latitude: lat,
      longitude: lng,
      address,
      placeName,
    };
    setCurrentLocation(customizeLoc);
    setLocation?.(customizeLoc);

    hideLoader();
  };

  const getLocationWithName = async (lat: number, lng: number) => {
    showLoader();

    const { address, placeName } = await getLocationName(lat, lng);
    const customizeLoc: Location = {
      latitude: lat,
      longitude: lng,
      address,
      placeName,
    };

    hideLoader();

    return customizeLoc;
  };

  return {
    fetchCurrentLocation,
    changeLocation,
    getLocationWithName,
  };
};
