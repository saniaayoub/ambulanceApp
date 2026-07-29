import { queryClient } from '../../App';
import { updateProfile } from '../services/profileService';
import { toastError, toastSuccess } from '../services/toast';
import { useAuthStore } from '../stores/authStore';
import { useLoaderStore } from '../stores/loaderStore';

export const getErrorMessage = (error: any) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';

export const useProfile = () => {
  const { showLoader, hideLoader } = useLoaderStore();
  const userData = useAuthStore(state => state.userData);

  const updateDriverProfile = async (formData: FormData) => {
    showLoader();
    try {
      const response = await updateProfile(formData);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      queryClient.invalidateQueries({
        queryKey: ['driver-data', userData?.driverId],
      });

      toastSuccess(response?.message);
    } finally {
      hideLoader();
    }
  };

  return {
    updateDriverProfile,
  };
};
