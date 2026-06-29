import { queryClient } from '../../App';
import {
  completeTrip,
  markDriverArrived,
  paymentRecieved,
  startTrip,
  tripAccept,
  tripCancel,
  tripReject,
} from '../services/driverService';
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
      setTripStep(response.data.status);
      // setIncomingRequest(null);
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });
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

  const handleArrived = async (tripId: string) => {
    showLoader();
    try {
      const response = await markDriverArrived(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setCurrentTrip(response.data);
      toastSuccess(response?.message);
      setTripStep(response?.data?.status);
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });
      // return response;
    } finally {
      hideLoader();
    }
  };

  const handleCancelTrip = async (tripId: string, reason: string) => {
    showLoader();
    try {
      const response = await tripCancel(tripId, reason);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setCurrentTrip(null);
      setTripStep(null);
      toastSuccess(response?.message);
      navigation.goBack();
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });
      // return response;
    } finally {
      hideLoader();
    }
  };

  const handleTripStart = async (tripId: string) => {
    showLoader();
    try {
      const response = await startTrip(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setCurrentTrip(response?.data);
      setTripStep(response?.data?.status);

      toastSuccess(response?.message);
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });
      // return response;
    } finally {
      hideLoader();
    }
  };

  const handleTripComplete = async (tripId: string) => {
    showLoader();
    try {
      const response = await completeTrip(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setCurrentTrip(response?.data);
      setTripStep(response?.data?.status);

      toastSuccess(response?.message);
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });
      // return response;
    } finally {
      hideLoader();
    }
  };

  const handlePaymentRecieved = async (tripId: string) => {
    showLoader();
    try {
      const response = await paymentRecieved(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }
      setCurrentTrip(null);
      setTripStep(null);

      toastSuccess(response?.message);
      queryClient.invalidateQueries({ queryKey: ['driver-stats'] });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      // return response;
    } finally {
      hideLoader();
    }
  };

  return {
    accept: acceptTripRequest,
    reject: rejectTripRequest,
    arrived: handleArrived,
    start: handleTripStart,
    complete: handleTripComplete,
    paymentReceived: handlePaymentRecieved,
    cancel: handleCancelTrip,
  };
};

export default useDriverTrips;
