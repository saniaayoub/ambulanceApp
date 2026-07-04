import { useQuery } from '@tanstack/react-query';
import { getDriver, getDriverStats } from '../services/driverService';

export const useDriver = (driverId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['driver-data', driverId],
    queryFn: () => getDriver(driverId!),
    enabled: !!driverId,

    // staleTime: 1000 * 60 * 5,
    // retry: 1,
  });
  return {
    data: data?.data,
    isLoading,
    error,
  };
};

export const useDriverDashboard = (driverId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['driver-stats'],
    queryFn: () => getDriverStats(),
    enabled: !!driverId,
    // staleTime: 1000 * 60 * 5,
    // retry: 1,
  });
  return {
    data: data?.data,
    isLoading,
    error,
  };
};
