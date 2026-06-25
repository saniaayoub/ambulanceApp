import { tripAccept, tripReject } from '../services/driverService';
import { toastError, toastSuccess } from '../services/toast';
import { useDriverStore } from '../stores/driverStore';
import { useLoaderStore } from '../stores/loaderStore';
import { getErrorMessage } from './useAuth';
import { useNavigation } from '@react-navigation/native';
const useDriverTrips = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoaderStore();
  const setCurrentTrip = useDriverStore(state => state.setCurrentTrip);
  const setIncomingRequest = useDriverStore(state => state.setIncomingRequest);
  const setTripStep = useDriverStore(state => state.setTripStep);

  const acceptTripRequest = async (tripId: string) => {
    showLoader();
    try {
      const response = await tripAccept(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setCurrentTrip(response.data);
      setTripStep('navigate_to_pickup');
      setIncomingRequest(null);

      toastSuccess(response?.message);
      navigation.navigate('Booking');
      // return response;
    } finally {
      hideLoader();
    }
  };

  const rejectTripRequest = async (tripId: string) => {
    showLoader();
    try {
      const response = await tripReject(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      toastSuccess(response?.message);
      setIncomingRequest(null);
      // return response;
    } finally {
      hideLoader();
    }
  };
  return {
    accept: acceptTripRequest,
    reject: rejectTripRequest,
  };
};

export default useDriverTrips;
