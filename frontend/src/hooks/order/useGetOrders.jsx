import { useState, useCallback } from 'react';
import { getOrders } from '../../services/order.service';

const useGetOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = useCallback(async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
        }
    }, []);

    return { orders, fetchOrders };
};

export default useGetOrders;