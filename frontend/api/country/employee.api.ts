import axios from "axios";
import { API_URL } from "../base";

export const getCountryList = async () => {
  try {
    const data = await axios.get(`${API_URL}/country`);
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la lista de paises');
  }
};
