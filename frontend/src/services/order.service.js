import axios from './root.service.js';
import { formatOrderData } from '@helpers/formatDataOrder.js';

export async function getOrders() {
    try {
        const { data } = await axios.get('/order/');
        const formattedData = data.data.map(formatOrderData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}