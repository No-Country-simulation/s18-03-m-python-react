import axios from "axios"
import { API_URL } from "../base"

export const getDepartmentList = async()=>{
    try {
        const response = await axios.get(`${API_URL}/department`)
        return response.data
    } catch (error) {
        console.error('No se pudo obtener la lista de departamentos', error);
        throw new Error('No se pudo obtener la lista de departamentos');
    }
}


//cambiar valores de data a interfaz de department
export const registerDepartment = async(department: any)=>{
    try {
        const response = await axios.post(`${API_URL}/department/`,
            department
        )
        return response.data;
    } catch (error) {
        console.error('Ocurrió un error al registrar el departamento', error);
        throw new Error('Ocurrió un error al registrar el departamento');
    }
}

export const updateDepartment = async(id:string, updatedData: any)=>{
    try {
        const response = await axios.put(`${API_URL}/department/${id}`,
            updatedData
        )
        return response.data;
    } catch (error) {
        console.error('Ocurrió un error al registrar el departamento', error);
        throw new Error('Ocurrió un error al registrar el departamento');
    }
}

export const getOneDepartment = async (id:string)=>{
    try {
        const response = await axios.get(`${API_URL}/department/${id}`)
        return response.data        
    } catch (error) {
        console.error('Ocurrió un error al obtener el departamento', error);
        throw new Error('Ocurrió un error al obtener el departamento');
    }
}

export const deleteDepartment = async (id:string)=>{
    try {
        const response = await axios.delete(`${API_URL}/department/${id}`);
    
        if (response.status === 204) {
          return "Departamento borrado con éxito";
        } else {
          return `No se pudo borrar el Departamento. Status code: ${response.status}`;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
        throw new Error("Error al borrar el departamento");
      }
}

