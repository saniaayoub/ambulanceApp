import {
  getCurrentLocation,
  getLocationName,
  requestLocationPermission,
} from '../services/locationService';
import { toastError } from '../services/toast';
import { useLoaderStore } from '../stores/loaderStore';
import { useLocationStore } from '../stores/locationStore';

export const useLocation = () => {
  const { setCurrentLocation } = useLocationStore();
  const { showLoader, hideLoader } = useLoaderStore();

  const changeLocation = async (lat: number, lng: number, setLocation) => {
    showLoader();
    const location = await getLocationName(lat, lng);
    const customizeLoc = {
      latitude: lat,
      longitude: lng,
      name: location,
    };
    setCurrentLocation(customizeLoc);
    setLocation?.(customizeLoc);
    hideLoader();
  };

  const getLocationWithName = async (lat: number, lng: number) => {
    showLoader();
    const location = await getLocationName(lat, lng);
    const customizeLoc = {
      latitude: lat,
      longitude: lng,
      name: location,
    };
    hideLoader();
    return customizeLoc;
  };

  return {
    changeLocation,
    getLocationWithName,
  };
};
