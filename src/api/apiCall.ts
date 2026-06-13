import axiosInstance from './axiosInstance';
import NetInfo from '@react-native-community/netinfo';
import { useQueueStore } from '../stores/queueStore';

export const apiCall = async (config: any) => {
  const netInfo = await NetInfo.fetch();
  console.log(netInfo, 'api');

  // Skip queueing if flagged
  if (!netInfo.isConnected && !config.skipQueue) {
    useQueueStore.getState().addToQueue(config);
    return { offline: true, message: 'Request queued for when online' };
  }

  try {
    const response = await axiosInstance(config);
    console.log(config, response, 'api response');
    return response.data;
  } catch (error) {
    console.log(config, error.message, 'api error');
    throw error;
  }
};
