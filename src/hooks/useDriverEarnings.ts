import { useQuery } from '@tanstack/react-query';

import { getDriverEarnings } from '../services/driverService';

type Period = 'today' | 'weekly' | 'monthly' | 'yearly';

export const useDriverEarnings = (period: Period) => {
  const { data, isLoading, isError, error, isRefetching, refetch } = useQuery({
    queryKey: ['driver-earnings', period],

    queryFn: () => getDriverEarnings(period),

    staleTime: 1000 * 60,

    refetchOnMount: true,

    refetchOnWindowFocus: false,
  });
  return { data: data?.data, isLoading, isError, error, isRefetching, refetch };
};
