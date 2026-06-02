import { createMMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = createMMKV();

export const mmkvStorage: StateStorage = {
  getItem: name => {
    return storage.getString(name) ?? null;
  },

  setItem: (name, value) => {
    storage.set(name, value);
  },

  removeItem: name => {
    // @ts-ignore
    storage.delete(name);
  },
};
export const STORAGE_KEYS = {
  LANGUAGE: 'app_language',
};
