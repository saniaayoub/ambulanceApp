import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useLoaderStore = create<LoaderState>(set => ({
  isLoading: false,
  setLoading: value => set({ isLoading: value }),
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
}));
