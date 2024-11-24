import axios from './root.service.js';

import { formatDishData } from '@helpers/formatData.js';

export async function getDishes() {
    try {
        const { data } = await axios.get('/dish/');
        const formattedData = data.data.map(formatDishData); // Formatear datos si es necesario
        return formattedData;
    } catch (error) {
        console.error("Error al obtener los platillos:", error);
        return {
            error: true,
            message: "No se pudieron obtener los platillos. Intenta más tarde.",
            details: error.response?.data || "Error desconocido",
        };
    }
}

export async function getDish(query) {
    try {
        const { data } = await axios.get(`/dish/detail`, { params: query });
        return data.data;
    } catch (error) {
        console.error("Error al obtener el platillo:", error);
        return error.response.data;
    }
}

export async function createDish(dishData) {
    try {
        console.log('Datos enviados a /dish:', dishData);
        const { data } = await axios.post('http://localhost:3000/api/dish/dish', dishData); 
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error) {
        console.error('Error al crear el platillo:', error);
        return { error: error.response.data };
    }
}

export async function updateDish(dishData, query) {
    try {
        const { data } = await axios.patch(`/dish/detail`, dishData, {
            params: { id: query.id || query.Nombre }, // Solo identificador en la query string
            headers: { "Content-Type": "application/json" }, // Asegura formato JSON
        });
        return data.data;
    } catch (error) {
        console.error("Error al actualizar el platillo:", error);
        return {
            error: true,
            message: "No se pudo actualizar el platillo. Intenta más tarde.",
            details: error.response?.data || "Error desconocido",
        };
    }
}

export async function deleteDish(query) {
    try {
        const { data } = await axios.delete(`/dish/detail`, { params: query });
        return data.data;
    } catch (error) {
        console.error("Error al eliminar el platillo:", error);
        return error.response.data;
    }
}
