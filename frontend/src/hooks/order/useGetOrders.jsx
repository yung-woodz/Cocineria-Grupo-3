import { useEffect, useState } from "react";
import { getOrders } from "../../services/order.service.js";

const useGetOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const orders = await getOrders();
            setOrders(orders);
        } catch (error) {
            console.error("Error al enviar ordernes", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, fetchOrders, setOrders };
};

export default useGetOrders;