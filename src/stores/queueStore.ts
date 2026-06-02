import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axiosInstance from '../api/axiosInstance';
import { mmkvStorage } from '../utils/mmkvStorage';

interface QueueItem {
  id: string;
  config: any;
}

interface QueueState {
  queue: QueueItem[];
  addToQueue: (config: any) => void;
  processQueue: () => Promise<void>;
  clearQueue: () => void;
}

export const useQueueStore = create<QueueState>()(
  persist(
    (set, get) => ({
      queue: [],
      addToQueue: (config: any) => {
        const id = Date.now().toString();
        set(state => ({ queue: [...state.queue, { id, config }] }));
      },
      processQueue: async () => {
        const { queue } = get();
        for (const item of queue) {
          try {
            await axiosInstance(item.config);
            // remove from queue
            set(state => ({
              queue: state.queue.filter(q => q.id !== item.id),
            }));
          } catch (error) {
            console.error('Failed to process queued request:', error);
            // keep in queue or handle
          }
        }
      },
      clearQueue: () => set({ queue: [] }),
    }),
    {
      name: 'queue-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
