import { queryClient } from '../../App';
import { logout as authLogout } from '../services/authService';
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
      console.log(
        queryClient
          .getQueryCache()
          .getAll()
          .map(q => q.queryKey),
        'k',
        ['driver-data', userData?.driverId],
      );
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
