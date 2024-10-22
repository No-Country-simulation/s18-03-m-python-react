/* eslint-disable @typescript-eslint/no-explicit-any */
// store/auth/register/useFormStore.ts

import { Person } from '@/interface/Person/Person';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { formatDataForBackend } from './utils/formatData';

interface FormStore {
  formData: Partial<Person>; 
  setFormData: (data: Partial<Person>) => void;
  resetFormData: () => void;
  getFormattedData: () => Person;
}

// Store de Zustand con middleware devtools para depuración
const useFormStore = create<FormStore>()(
  devtools(
    (set, get) => ({
      formData: {}, // Estado inicial vacío

      setFormData: (data: Partial<Person>) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        }), false, 'Set Form Data'),

      resetFormData: () => set({ formData: {} }, false, 'Reset Form Data'),

      getFormattedData: () => formatDataForBackend(get().formData),
    }),
    { name: 'form-store' } // Nombre para identificar en las devtools
  )
);

export default useFormStore;
