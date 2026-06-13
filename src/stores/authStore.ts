import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../utils/mmkvStorage';
import { CountryData, getFlagEmoji } from '../components/PhoneInput';

interface AuthState {
  role: string;
  token: string | null;
  fcmToken: string | null;
  selectedCountry: CountryData;
  otpResult: any;
  setToken: (token: string) => void;
  clearToken: () => void;
  setFCMToken: (token: string) => void;
  setRole: (role: string) => void;
  setSelectedCountry: (country: CountryData) => void;
  setOTPResult: (result: object) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      role: '',
      fcmToken: null,
      otpResult: null,
      selectedCountry: {
        iso2: 'pk',
        dialCode: '+92',
        label: 'Pakistan',
        flag: getFlagEmoji('pk'),
      },
      setOTPResult: (otpResult: object) => set({ otpResult }),
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
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
    },
  ),
);
