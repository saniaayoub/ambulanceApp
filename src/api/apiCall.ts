import axiosInstance from './axiosInstance';
import NetInfo from '@react-native-community/netinfo';
import { useQueueStore } from '../stores/queueStore';

export const apiCall = async (config: any) => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    // Add to queue
    useQueueStore.getState().addToQueue(config);
    return { offline: true, message: 'Request queued for when online' };
  }

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
