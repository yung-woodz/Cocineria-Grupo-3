import { useState, useEffect } from 'react';
import { getOrders } from '@services/order.service.js';

const useOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            const formattedData = response.map(order => ({
                customer: order.customer,
                tableNumber: order.tableNumber,
                description: order.description,
                total: order.total,
                status: order.status,
                createdAt: order.createdAt,
            }));
            dataLogged(formattedData);
            setOrders(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    /* const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    }; */

    return { orders, fetchOrders, setOrders };
};

export default useOrders;