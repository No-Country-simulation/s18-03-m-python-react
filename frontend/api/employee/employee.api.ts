import { API_URL } from "../base"
import axios from 'axios';

// Ver Swagger en Backend, el endpoint de employee incluye la entidad PERSON

export const getEmployees = async()=>{
    try {
        const response = await axios.get(`${API_URL}/employee`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de empleados',error);
        throw new Error('Error al obtener la lista de empleados');
    }
}

// cambiar tipo any por interfaz de employee/peprson
export const registerEmployee = async(employee: any)=>{
    try {
        const response = await axios.post(`${API_URL}/employee`,
            {employee}
        );
        return response.data;
    } catch (error) {
        console.error('Error al registrar el empleado',error);
        throw new Error('Error al registrar el empleado')
    }
}

export const getOneEmployee = async(id: string)=>{
    try {
        const response = await axios.get(`${API_URL}/employee/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el empleado', error);
        throw new Error('Error al obtener el empleado');
    }
}


export const updateEmployee = async(id: string, employee: any) =>{
    try {
        const response = await axios.put(`${API_URL}/employee/${id}`,{
            employee
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el empleado',error);
        throw new Error('No se pudo actualizar el empleado');
    }   
}


export const deleteEmployee = async (id: string): Promise<string> => {
    try {
        const response = await axios.delete(`${API_URL}/employee/${id}`);

        if (response.status === 204) {
            return 'Empleado borrado con éxito';
        } else {
            return `No se pudo borrar el empleado. Status code: ${response.status}`;
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Error al borrar el empleado');
    }
};