import axiosInstance from './axiosInstance';
import NetInfo from '@react-native-community/netinfo';
import { useQueueStore } from '../stores/queueStore';
import { toastError } from '../services/toast';

export const apiCall = async (config: any) => {
  const netInfo = await NetInfo.fetch();
  // Skip queueing if flagged
  if (!netInfo.isConnected && !config.skipQueue) {
    toastError('No internet connection. Request queued for when online');
    useQueueStore.getState().addToQueue(config);
    return { offline: true, message: 'Request queued for when online' };
  }
  if (!netInfo.isConnected) {
    toastError('No internet connection. Request queued for when online');
  }
  try {
    const response = await axiosInstance(config);
    console.log(config, response, 'api response');
    return response.data;
  } catch (error) {
    toastError(error?.message);

    console.log(config, error, 'api error');
    throw error;
  }
};
