import axios from './root.service.js';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post("/order", orderData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

/* export const getOrder = async (id) => {
    try {
        const response = await axios.get(`/order/order${id}`);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
} */

export const getOrdersByChef = async (id) => {
    try{
        const response = await axios.get(`/order/orderByChef?id=${id}`);
        return response.data.data || [];
    } catch (error){
        throw error.response.data;
    }
}

export const getOrders = async () => {
    try {
        const response = await axios.get("/order/all");
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`/order/${id}`);
        return response;
    } catch (error) {
        throw error.response.data;
    }
}

export const updateOrder = async (id, orderData) => {
    try {
        const response = await axios.patch(`/order/${id}`, orderData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}