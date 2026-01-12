/* eslint-disable @typescript-eslint/no-explicit-any */

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

const isNative = Capacitor.isNativePlatform();
console.log({isNative,web:Capacitor.getPlatform()})

export const Storage = {
  async get(key: string): Promise<string | null> {
    if (isNative) {
      const { value } = await Preferences.get({ key });
      return value;
    }
    return localStorage.getItem(key);
  },

  async set(key: string, value: string) {
    if (isNative) {
      await Preferences.set({ key, value });
    } else {
      localStorage.setItem(key, value);
    }
  },

  async remove(key: string) {
    if (isNative) {
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  },

  async clear() {
    if (isNative) {
      await Preferences.clear();
    } else {
      localStorage.clear();
    }
  }
};
// set platform
Storage.set('platform', Capacitor.getPlatform());
