import axios from "axios";
import { API_URL } from "../base";

export const getCityList = async () => {
  try {
    const data = await axios.get(`${API_URL}/city`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
