import { API_URL } from "../base"
import axios from 'axios';


// Define la interfaz para un empleado
export interface Employee {
    dni: string | null | undefined;
    phone_number: string | null | undefined;
    birth: string | null | undefined; // Formato YYYY-MM-DD
    country: string | null | undefined; // ID del país
    province: string | null | undefined; // ID de la provincia
    city: string | null | undefined; // ID de la ciudad
    address: string | null | undefined;
    bank: string | null | undefined; // Nombre del banco
    bank_account_type: string | null; // Tipo de cuenta
    bank_account_number: string | null ;
    email: string | null | undefined;
    first_name: string;
    last_name: string;
    employee: {
        start_date: string | null | undefined; // Formato YYYY-MM-DD
        department: string | null | undefined; // ID del departamento
        role: string[] | null | undefined;
        salary: string | null | undefined;
        working_day: string | null | undefined; // Ya está en el formato correcto
    };
    profile_picture?: string | null | undefined; // URL de la foto
}

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
export const registerEmployee = async(employee:Employee)=>{
    try {
        const response = await axios.post(`${API_URL}/employee/`,
            employee
        );
        return response.data;
    } catch (error) {
        console.error('Error al registrar el empleado',error);
        throw new Error('Error al registrar el empleado');
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


export const updateEmployee = async(id: string, employee: Employee) =>{
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


export const deleteEmployee = async (pk: number): Promise<string> => {
    try {
        const response = await axios.delete(`${API_URL}/employee/${pk}`);

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

export const changeEmployeeStatus = async (id: number)=>{
    try {
        const response = await axios.post(`${API_URL}/activeemployee/${id}/`);
        if (response.status === 200){
            return "Estado de empleado cambiado con éxito!"
        }
    } catch (error) {
        console.error( 'Error al cambiar el estado del empleado', error);
        throw new Error('Error al cambiar el estado del empleado');
    }
}


export const updatePicture = async (id: string, picture: File) => {
    try {
        // Crear instancia de FormData y añadir la imagen
        const formData = new FormData();
        formData.append('profile_picture', picture);

        const response = await axios.post(`${API_URL}/profilepicture/${id}/`, formData);

        if (response.status === 200) {
            return 'Foto actualizada con éxito';
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Error al actualizar la foto');
    }
};

        