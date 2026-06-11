import { useInfiniteQuery } from '@tanstack/react-query';
import { getRideHistory } from '../services/rideService';

export const useRideHistory = (status?: string) => {
  return useInfiniteQuery({
    queryKey: ['ride-history', status],

    queryFn: ({ pageParam = 1 }) =>
      getRideHistory({
        page: pageParam,
        status,
      }),

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.nextPage;
    },
  });
};
