import axios from "axios"
import { API_URL } from "../base"

export const getAccountTypes = async()=>{
    try {
        const response = await axios.get(`${API_URL}/bankaccounttype/`)
        return response.data
    } catch (error) {
        console.error('Ocurrió un Error al obtener los tipos de cuentas bancarias', error);
        throw new Error('Ocurrió un Error al obtener los tipos de cuentas bancarias');
    }
}