import { getCurrentLocation } from '../services/locationService';
import { useLocationStore } from '../stores/locationStore';

export const useLocation = () => {
  const setCurrentLocation = useLocationStore(
    state => state.setCurrentLocation,
  );

  const fetchLocation = async () => {
    const position = await getCurrentLocation();

    setCurrentLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  return { fetchLocation };
};
