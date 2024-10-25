import { getAccountTypes } from "@/api";
import { createJSONStorage, StateStorage } from "zustand/middleware";

const AccountStorageApi: StateStorage = {
  getItem: (name: string): Promise<string | null> => {
    try {
      const dataBackend = getAccountTypes();
      console.log('Data backend -> ', dataBackend);
      //const data = sessionStorage.getItem(name);
      return dataBackend;
    }
    catch (error: any) {
      console.error(error);console.error("Error fetching data from Firebase:", error);
      throw error;
    }

  },
  setItem: (name: string, value: string): void => {
    sessionStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};
export const AccountBackendStorage = createJSONStorage(() => AccountStorageApi);
