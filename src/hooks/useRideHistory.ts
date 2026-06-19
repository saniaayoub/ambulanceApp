import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  deleteTrip,
  getTripDetail,
  getTrips,
} from '../services/bookingService';
import { useLoaderStore } from '../stores/loaderStore';
import { toastError } from '../services/toast';
import { getErrorMessage } from './useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
export const useTrips = (limit = 10, status?: string) => {
  return useInfiniteQuery({
    queryKey: ['trips', status],
    queryFn: ({ pageParam = 1 }) =>
      getTrips({
        page: pageParam,
        limit,
        status,
      }),

    getNextPageParam: lastPage => {
      const pagination = lastPage?.data?.pagination;

      if (pagination?.page < pagination?.pages) {
        return pagination.page + 1;
      }

      return undefined;
    },

    initialPageParam: 1,
  });
};

export const useTripDetail = (tripId?: string) => {
  return useQuery({
    queryKey: ['trip-detail', tripId],
    queryFn: () => getTripDetail(tripId!),
    enabled: !!tripId, // IMPORTANT (prevents empty call)
    staleTime: 1000 * 60, // 1 min cache
  });
};

export const useTrip = () => {
  const { showLoader, hideLoader } = useLoaderStore();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleDeleteTrip = async (tripId: string) => {
    showLoader();
    try {
      const response = await deleteTrip(tripId);

      if (!response.success) {
        toastError(getErrorMessage(response.error));
        return response;
      }

      queryClient.invalidateQueries({
        queryKey: ['trips'],
      });

      navigation.goBack();
    } finally {
      hideLoader();
    }
  };
  return {
    handleDeleteTrip,
  };
};
