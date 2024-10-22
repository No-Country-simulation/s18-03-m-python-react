import axios from "axios";
import { API_URL } from "../base";

export const getBankList = async () => {
  try {
    const response = await axios.get(`${API_URL}/bank`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de bancos", error);
    throw new Error("Error al obtener la lista de bancos");
  }
};

//cambiar bank por interfaz acorde
export const bankRegister = async (bank: any) => {
  try {
    const response = await axios.post(`${API_URL}/bank/`, {
      ...bank,
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar la entidad bancaria", error);
    throw new Error("Error al obtener la lista de bancos");
  }
};

export const updateBank = async (id: string, newData: any) => {
  try {
    const response = await axios.put(`${API_URL}/bank/${id}`, {
      ...newData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el banco", error);
    throw new Error("Error al actualizar el banco");
  }
};

export const deleteBank = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/bank/${id}`);

    if (response.status === 204) {
      return "Banco borrado con éxito";
    } else {
      return `No se pudo borrar el banco. Status code: ${response.status}`;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }

    throw new Error("Error al borrar el banco");
  }
};