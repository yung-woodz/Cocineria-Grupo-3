import { useEffect, useState } from "react";
import { getOrdersByChef } from "@services/order.service.js";

const useGetOrdersByChef = (chefId) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para mostrar que está cargando
    const [error, setError] = useState(null); // Estado para capturar errores

    const fetchOrdersByChef = async () => {
        try {
            /* console.log("Ejecutando fetchOrdersByChef con chefId:", chefId); */
            setLoading(true);
            const orders = await getOrdersByChef(chefId);
            /* console.log("Órdenes obtenidas del servidor:", orders); */
            setOrders(orders);
            setError(null);
        } catch (error) {
            /* console.error("Error al obtener las órdenes:", error); */
            setError(error.message || "Error desconocido");
        } finally {
            setLoading(false);
            /* console.log("Estado de carga completado"); */
        }
    };

    useEffect(() => {
        if (chefId) {
            fetchOrdersByChef();
        }
    }, [chefId]); // Se ejecuta cuando la id cambia

    return { orders, fetchOrdersByChef, loading, error };
};

export default useGetOrdersByChef;
