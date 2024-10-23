import axios from "axios"
import { API_URL } from './../base';

export const getVacationList = async ()=>{
    try {
        const response =await axios.get(`${API_URL}/vacation-requests/`)
        return response.data
    } catch (error) {
        console.error('Ocurrio un error al obtener la lista de vacaciones', error);
        throw new Error('Ocurrio un error al obtener la lista de vacaciones');
    }
}

export const createVacationRequest = async (vacation: any)=>{
    try {
        const response = await axios.post(`${API_URL}/vacation-requests/`,{
            ...vacation
        })
        return response.data
    } catch (error) {
        console.error('Ocurrio un error al obtener la lista de vacaciones', error);
        throw new Error('Ocurrio un error al obtener la lista de vacaciones');
    }
}