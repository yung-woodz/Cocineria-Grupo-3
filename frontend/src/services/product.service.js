import axios from './root.service.js';
import { formatProductData } from '@helpers/formatData.js';

export async function getProducts() {
    try {
        const { data } = await axios.get('/product/');
        const formattedData = data.data.map(formatProductData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function createProduct(data) {
    try {
        const response = await axios.post("/product/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function updateProduct(data, id) {
    try {
        const response = await axios.patch(`/product/detail/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
