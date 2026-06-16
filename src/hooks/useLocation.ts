import {
  getCurrentLocation,
  getLocationName,
  requestLocationPermission,
} from '../services/locationService';
import { toastError } from '../services/toast';
import { useLoaderStore } from '../stores/loaderStore';
import { useLocationStore } from '../stores/locationStore';

export const useLocation = () => {
  const { setCurrentLocation, currentLocation } = useLocationStore();
  const { showLoader, hideLoader } = useLoaderStore();

  const fetchLocation = async () => {
    const granted = await requestLocationPermission();

    if (!granted) {
      toastError('Maps Permission denied');
      return;
    }
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
    } catch (e) {
      console.log(e, 'Maps');
    }
  };

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
    fetchLocation,
    currentLocation,
    changeLocation,
    getLocationWithName,
  };
};
