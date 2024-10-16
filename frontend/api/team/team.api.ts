import { API_URL } from "../base";
import axios from "axios";

export const getTeamList = async () => {
  try {
    const response = await axios.get(`${API_URL}/team`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de equipos", error);
    throw new Error("Error al obtener la lista de equipos");
  }
};

// cambiar tipo any por interfaz de team
export const createNewTeam = async (team: any) => {
  try {
    const response = await axios.post(`${API_URL}/team`, {
      team,
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar el equipo", error);
    throw new Error("Error al registrar el equipo");
  }
};

export const getOneTeam = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/team/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el equipo", error);
    throw new Error("Error al obtener el equipo");
  }
};

export const updateTeam = async (id: string, team: any) => {
  try {
    const response = await axios.put(`${API_URL}/employee/${id}`, {
      team,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el equipo", error);
    throw new Error("No se pudo actualizar el equipo");
  }
};

export const deleteTeam = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete(`${API_URL}/team/${id}`);

    if (response.status === 204) {
      return "Equipo borrado con éxito";
    } else {
      return `No se pudo borrar el Equipo. Status code: ${response.status}`;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error al borrar el Equipo");
  }
};
