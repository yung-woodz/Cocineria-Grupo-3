import axios from './root.service.js';
import { formatDishData } from '@helpers/formatData.js';

export async function getDishes() {
    try {
        const { data } = await axios.get('/dish/');
        const formattedData = data.data.map(formatDishData); 
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}


export async function createDish(dishData) {
    try {
        const response = await axios.post('/dish', dishData);
        return  response.data.data;
    } catch (error) {
        throw error;
    }
}

export async function updateDish(dishData, query) {
    try {
        const { data } = await axios.patch(`/dish/detail`, dishData, {
            params: { id: query.id || query.Nombre }, 
            headers: { "Content-Type": "application/json" }, 
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteDish(query) {
    try {
        const { data } = await axios.delete(`/dish/detail`, { params: query });
        return data.data;
    } catch (error) {
        throw error;
    }
}
