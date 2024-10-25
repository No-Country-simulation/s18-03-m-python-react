import { createJSONStorage, StateStorage } from "zustand/middleware";

const backendStorageApi: StateStorage = {
  getItem: (name: string): string | Promise<string | null> | null => {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: (name: string, value: string): void => {
    sessionStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};
export const backendStorage = createJSONStorage(() => backendStorageApi);
