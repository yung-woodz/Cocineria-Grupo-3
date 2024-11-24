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
// revisar bien esto :
export async function createDish(dishData) {
    try {
        console.log('Datos enviados a /dish:', dishData);
        const { data } = await axios.post('http://localhost:3000/api/dish/dish', dishData);
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error) {
        if (error.response) {
            // Errores enviados por el servidor (código 400 o 500)
            console.error('Error al crear el platillo:', error.response.data);
            return { error: error.response.data };
        } else if (error.request) {
            // El servidor no respondió
            console.error('No se recibió respuesta del servidor:', error.request);
            return { error: { message: 'No se recibió respuesta del servidor.' } };
        } else {
            // Errores al configurar la solicitud
            console.error('Error al configurar la solicitud:', error.message);
            return { error: { message: error.message } };
        }
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
