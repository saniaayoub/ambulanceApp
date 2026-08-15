import { useQuery } from '@tanstack/react-query';
import {
  getHomeData,
  getHospitalDetails,
  getHospitalsData,
} from '../services/userService';

export const useHomeData = (latitute?: number, longitude?: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['home-data'],
    queryFn: () => getHomeData({ latitute, longitude }),
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: 1,
    enabled: !!latitute && !!longitude,
  });
  return {
    data: data?.data,
    isLoading: isLoading,
  };
};

export const useHospitalsData = (latitute?: number, longitude?: number) => {
  return useQuery({
    queryKey: ['hospitals-data'],
    queryFn: () =>
      getHospitalsData({ lat: latitute, lng: longitude, radius: 5000 }),
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: 1,
    enabled: !!latitute && !!longitude,
    refetchOnWindowFocus: false,
  });
};

export const useHospitalDetails = (placeId?: string) => {
  return useQuery({
    queryKey: ['hospital-details', placeId],
    queryFn: () => getHospitalDetails(placeId!),
    enabled: !!placeId,
    // staleTime: 1000 * 60 * 5,
    // retry: 1,
  });
};
