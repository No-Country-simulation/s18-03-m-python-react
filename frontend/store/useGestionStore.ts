import { create } from "zustand";

// Interfaz de los datos de gestión
interface GestionData {
  pk?: string;
  name?: string;
  title?: string;
}

// Interfaz del estado de la tienda (Zustand)
interface GestionStore {
  formData: GestionData; // Datos del formulario
  setFormData: (data: GestionData) => void; // Actualizar los datos del formulario
  clearForm: () => void; // Limpiar el formulario
}

// Creación de la tienda con Zustand
export const useGestionStore = create<GestionStore>((set) => ({
  formData: {
    pk: "",
    name: "",
    title: "",
  },

  // Función para actualizar el formulario
  setFormData: (data: GestionData) =>
    set({
      formData: data,
    }),

  // Función para limpiar el formulario
  clearForm: () =>
    set({
      formData: {
        pk: "",
        name: "",
        title: "",
      },
    }),
}));