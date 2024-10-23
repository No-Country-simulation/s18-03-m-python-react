import axios from "axios";
import { API_URL } from "../base";

    
export const getAllEntitiesData = async () => {
    const response = await axios.get(`${API_URL}/entitiesamount/`);
    return response.data;
}