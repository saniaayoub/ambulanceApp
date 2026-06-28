export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
  placeName?: string;
};
interface LocationState {
  currentLocation: Location | null;
  setCurrentLocation: (location: any) => void;
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/mmkvStorage';

export const useLocationStore = create<LocationState>()(set => ({
  currentLocation: null,
  setCurrentLocation: (location: Location) =>
    set({
      currentLocation: location,
    }),
}));
