import axios from "axios"
import { API_URL } from './../base';
import { vacation, vacationresponse } from "@/interface";

export const getVacationList = async ()=>{
    try {
        const response =await axios.get(`${API_URL}/vacation-requests/`)
        return response.data
    } catch (error) {
        console.error('Ocurrio un error al obtener la lista de vacaciones', error);
        throw new Error('Ocurrio un error al obtener la lista de vacaciones');
    }
}

export const createVacationRequest = async (vacation: vacation)=>{
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

//interface must have the following structure 
//{
//     
//     }

export const responseVacation = async(vacationResponse: vacationresponse)=> {
    try {
        const response = await axios.post(`${API_URL}/vacationresponse/`,
            {...vacationResponse}
        )
        if(response.status === 200) return "Exito!"
    } catch (error) {
        console.error("Error al cambiar el estado de la petición", error);
        throw new Error("Error al cambiar el estado de la petición");
    }
}