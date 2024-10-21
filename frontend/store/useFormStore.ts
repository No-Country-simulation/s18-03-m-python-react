/* eslint-disable @typescript-eslint/no-explicit-any */
// store/auth/register/useFormStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Definimos la interfaz Employee, con todas las propiedades como strings
interface Employee {
  start_date: string | null;   // Fecha en formato 'YYYY-MM-DD'
  department: string | null;   // ID del departamento como string
  team?: string[];             // Array de IDs de team como strings
  role: string[];              // Array de roles como strings
  salary: string | null;       // Salario como string
  working_day: string | null;  // Descripción del horario de trabajo
}

// Definimos la interfaz Person, con todas las propiedades como strings
interface Person {
  first_name: string;
  last_name: string;
  dni: string | null ;                  // DNI como string
  phone_number: string | null;         // Número de teléfono como string
  email: string;
  birth: string | null;                // Fecha de nacimiento en formato 'YYYY-MM-DD'
  address: string | null;              // Dirección como string
  country: string | null;              // ID del país como string
  province: string | null;             // ID de la provincia como string
  city: string | null;                 // ID de la ciudad como string
  bank: string | null;                 // ID del banco como string
  bank_account_type: string | null ;    // Tipo de cuenta bancaria como string
  bank_account_number: string | null;  // Número de cuenta bancaria como string
  profile_picture?: File | null;
  start_date?: string | null;
  departament?: string | null;
  role?: string[];
  salary?: string | null;
  working_day?: string | null;                     // Archivo de imagen (opcional)

  employee: Employee | null;           // Datos del empleado anidados
}

// Definimos la interfaz FormStore que representa nuestro store de Zustand
interface FormStore {
  formData: Partial<Person>;  // Guardamos los datos en el estado tipado como `Person`
  setFormData: (data: Partial<Person>) => void;  // Función para actualizar los datos
  resetFormData: () => void;   // Resetea los datos del formulario
  getFormattedData: () => Person; // Método para obtener los datos formateados para el backend
}

// Función para convertir los datos según el formato esperado por el backend
const formatDataForBackend = (data: Partial<Person>): Person => {
  const formatDate = (date?: string | null) => (date ? new Date(date).toISOString().split('T')[0] : null);

  return {
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    dni: data.dni || null,
    phone_number: data.phone_number || null,
    email: data.email || "",
    birth: formatDate(data.birth),  // Convertir fecha de nacimiento a 'YYYY-MM-DD'
    address: data.address || null,
    country: data.country || null,
    province: data.province || null,
    city: data.city || null,
    bank: data.bank || null,
    bank_account_type: data.bank_account_type || null,
    bank_account_number: data.bank_account_number || null,
    profile_picture: data.profile_picture || null,

    // Anidamos datos de 'employee' si alguno de ellos está presente
    employee: data.employee ? {
      start_date: formatDate(data.employee.start_date),
      department: data.employee.department || null,
      role: data.employee.role || [],
      salary: data.employee.salary || null,
      working_day: data.employee.working_day || null,
      team: data.employee.team || [],
    } : null,
  };
};

// Creamos el store de Zustand con devtools
const useFormStore = create<FormStore>()(
  devtools((set, get) => ({
    formData: {}, // Estado inicial vacío

    setFormData: (data) => {
      // Actualiza los datos del formulario
      set((state) => ({
        formData: { ...state.formData, ...data },
      }), false, `Set Form Data - Step `);
    },

    resetFormData: () => set({ formData: {} }, false, "Reset Form Data"),

    getFormattedData: () => {
      // Obtiene los datos formateados para el backend
      return formatDataForBackend(get().formData);
    }
  }))
);

export default useFormStore;
