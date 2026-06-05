type Location = {
  latitude: number;
  longitude: number;
};

interface LocationState {
  currentLocation: Location | null;
  setCurrentLocation: (location: any) => void;
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/mmkvStorage';

export const useLocationStore = create<LocationState>()(
  persist(
    set => ({
      currentLocation: null,
      setCurrentLocation: (location: Location) =>
        set({
          currentLocation: location,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
