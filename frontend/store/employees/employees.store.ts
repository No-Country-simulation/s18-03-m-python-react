import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EmployeesBackendStorage } from "../storages/employees.storage";
import { Person } from "@/interface";

interface EmployeeState {
  //propriety
  employee: Record<string, Person> | undefined;
  //methods
  addEmployee: (employee: Person) => void;
  setEmployee: (pk: number) => Person | undefined;
}

const EmployeeStoreApi: StateCreator<
  EmployeeState,
  [["zustand/devtools", never]]
> = (set, get) => {
  // Cargar datos desde sessionStorage
  const storedData = sessionStorage.getItem("EmployeeStore");
  const initialEmployee = storedData ? JSON.parse(storedData) : undefined;
  return {
    employee: initialEmployee,
    addEmployee: (employee: Person) => {
      set((state) => ({
        employee: {
          ...state.employee,
          [employee.pk]: employee,
        },
      }));
    },
    setEmployee: (pk: number) => {
      const employeeFind = get().employee?.[pk];
      return employeeFind;
    },
  };
};

export const useEmployeeStore = create<EmployeeState>()(
  devtools(
    persist(EmployeeStoreApi, {
      name: "EmployeeStore",
      storage: EmployeesBackendStorage,
      //storage: fireBaseStorage,
    })
  )
);
