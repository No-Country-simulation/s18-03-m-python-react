import axios from "axios";
import { API_URL } from "../base";

export const getCityList = async () => {
  try {
    const data = await axios.get(`${API_URL}/city`);
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la lista de paises');
  }
};
