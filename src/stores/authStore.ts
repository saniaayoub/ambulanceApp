import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/mmkvStorage';
import { CountryData, getFlagEmoji } from '../components/PhoneInput';
export type UserRole = 'USER' | 'DRIVER';

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
interface AuthState {
  role: string;
  token: string | null;
  userData: User | null;
  fcmToken: string | null;
  selectedCountry: CountryData;
  otpResult: any;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setToken: (token: string) => void;
  setUserData: (data: User) => void;
  clearToken: () => void;
  setFCMToken: (token: string) => void;
  setRole: (role: string) => void;
  setSelectedCountry: (country: CountryData) => void;
  setOTPResult: (result: object) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      userData: null,
      token: null,
      role: '',
      fcmToken: null,
      otpResult: null,
      hasHydrated: false,
      selectedCountry: {
        iso2: 'pk',
        dialCode: '+92',
        label: 'Pakistan',
        flag: getFlagEmoji('pk'),
      },
      setHasHydrated: value => set({ hasHydrated: value }),
      setUserData: (data: User) => set({ userData: data }),
      setOTPResult: (otpResult: object) => set({ otpResult }),
      setToken: (token: string) => set({ token }),
      clearToken: () => {
        console.log('clearToken');
        set({ token: null, userData: null });
      },
      setRole: (role: string) => set({ role: role }),
      setSelectedCountry: (country: CountryData) =>
        set({ selectedCountry: country }),
      setFCMToken: (token: string) =>
        set({
          fcmToken: token,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
