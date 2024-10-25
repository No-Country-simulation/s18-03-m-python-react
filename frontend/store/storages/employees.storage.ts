import { getEmployees } from "@/api";
import { createJSONStorage, StateStorage } from "zustand/middleware";

const EmployeesStorageApi: StateStorage = {
  getItem: async(name: string): Promise<string | null> => {
    try {
      const dataBackend = await getEmployees();
      console.log("Data backend -> ", dataBackend);
      sessionStorage.setItem(name, JSON.stringify(dataBackend));
      const data = sessionStorage.getItem(name);
      return JSON.stringify(data);
    } catch (error: any) {
      console.error(error);
      console.error("Error fetching data from Firebase:", error);
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
export const EmployeesBackendStorage = createJSONStorage(() => EmployeesStorageApi);
