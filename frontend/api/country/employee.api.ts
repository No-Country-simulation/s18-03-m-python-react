import axios from "axios";
import { API_URL } from "../base";

export const getCountryList = async () => {
  try {
    const response = await axios.get(`${API_URL}/country`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la lista de paises');
  }
};
