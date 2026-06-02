import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/mmkvStorage';

interface AuthState {
  token: string | null;
  fcmToken: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  setFCMToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,

      fcmToken: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
      setFCMToken: (token: string) =>
        set({
          fcmToken: token,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
