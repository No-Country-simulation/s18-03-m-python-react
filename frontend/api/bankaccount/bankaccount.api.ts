import axios from "axios"
import { API_URL } from "../base"

export const getAccountTypes = async()=>{
    try {
        const response = await axios.get(`${API_URL}/bankaccounttype/`)
        return response.data
    } catch (error) {
        console.error('Ocurrió un Error al obtener los tipos de cuentas bancarias', error);
        throw new Error('Ocurrió un Error al obtener los tipos de cuentas bancarias');
    }
}

export const registerAccount = async(accountType: any)=>{
    try {
        const response = await axios.post(`${API_URL}/bankaccounttype/`,
            accountType
        )
        return response.data;
    } catch (error) {
        console.error('Ocurrió un error al registrar la cuenta', error);
        throw new Error('Ocurrió un error al registrar la cuenta');
    }
}

export const deleteAccount = async (id:string)=>{
    try {
        const response = await axios.delete(`${API_URL}/bankaccounttype/${id}`);
    
        if (response.status === 204) {
          return "Tipo de cuenta borrado con éxito";
        } else {
          return `No se pudo borrar el Tipo de cuenta. Status code: ${response.status}`;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
        throw new Error("Error al borrar el Tipo de cuenta");
      }
}

export const updateAccount = async (id: string, newData: any) => {
  try {
    const response = await axios.put(`${API_URL}/bankaccounttype/${id}`, {
      ...newData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el Rol", error);
    throw new Error("Error al actualizar el Rol");
  }
};