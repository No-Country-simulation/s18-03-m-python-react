/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "./../base";

export const getAllAssistances = async () => {
  try {
    const response = await axios.get(`${API_URL}/assistancereport/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const openAssistance = async (assistance: any) => {
  try {
    const response = await axios.post(`${API_URL}/openassistance/`, {
      ...assistance,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrio un error al registrar la entrada");
  }
};

export const closeAssistance = async (assistance: any) => {
  try {
    const response = await axios.post(`${API_URL}/endassistance/`, {
      ...assistance,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrio un error al registrar la salida");
  }
};

export const justifyAssistance = async (absence: any) => {
  try {
    const response = await axios.post(`${API_URL}/justifyassistance/`, {
      ...absence,
    });
    return response.data;
  } catch (error) {
    console.error("Ocurrio un error al justificar la inasistencia");
    throw new Error("Ocurrio un error al justificar la inasistencia");
  }
};
