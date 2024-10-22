import axios from "axios";
import { API_URL } from "../base";

export const getAllRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/role`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
//cambiar tipo any por interfaz acorde
export const createNewRole = async (role: any) => {
  try {
    const response = await axios.post(`${API_URL}/role/`, {
      ...role,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear un nuevo Rol", error);
    throw new Error("Error al crear un nuevo Rol");
  }
};

export const updateNewRole = async (id: string, newData: any) => {
  try {
    const response = await axios.put(`${API_URL}/role/${id}`, {
      ...newData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el Rol", error);
    throw new Error("Error al actualizar el Rol");
  }
};

export const getRole = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/role/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener un nuevo Rol", error);
    throw new Error("Error al obtener un nuevo Rol");
  }
};

export const deleteRole = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/role/${id}`);

    if (response.status === 204) {
      return "Rol borrado con éxito";
    } else {
      return `No se pudo borrar el Rol. Status code: ${response.status}`;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error al borrar el Rol");
  }
};
