import axios from "axios";
import { API_URL } from "../base";

export const getProvinceList = async () => {
  try {
    const response = await axios.get(`${API_URL}/province`);
    return response.data;
  } catch (error) {
    console.error('Error fetching province list: ', error);
    throw new Error('Error al Obtener la lista de provincias');
  }
};
