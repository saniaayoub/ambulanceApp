import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getDriverTripDetail, getDriverTrips } from '../services/driverService';

export const useDriverTrips = (limit = 10, status?: string) => {
  return useInfiniteQuery({
    queryKey: ['driver-trips', status],

    queryFn: ({ pageParam = 1 }) =>
      getDriverTrips({
        page: pageParam,
        limit,
        status,
      }),

    getNextPageParam: lastPage => {
      const pagination = lastPage?.data?.pagination;

      if (pagination?.page < pagination?.pages) {
        return pagination?.page + 1;
      }

      return undefined;
    },

    initialPageParam: 1,
  });
};

export const useDriverTripDetail = (tripId?: string) => {
  return useQuery({
    queryKey: ['driver-trip-detail', tripId],

    queryFn: () => getDriverTripDetail(tripId!),

    enabled: !!tripId,

    staleTime: 1000 * 60,
  });
};
