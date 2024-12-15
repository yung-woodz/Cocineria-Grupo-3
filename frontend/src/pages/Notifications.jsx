import React, { useEffect } from "react";
import Table from "@components/Table";
import useGetOrdersByChef from "@hooks/order/useGetOrdersByChef";
import { initSocket } from "../services/notification.service.js";
import { useNotification } from "../context/NotificationsContext";
import "@styles/users.css";

const Notifications = () => {
    const user = JSON.parse(sessionStorage.getItem("usuario")); // Obtener datos del usuario en sesión
    const chefId = user?.id; // ID del usuario autenticado
    const { orders, setOrders, loading, error } = useGetOrdersByChef(chefId);
    const { setNotifications } = useNotification(); // Usar contexto para manejar notificaciones

    const columns = [
        { title: "Customer", field: "customer", width: 350, responsive: 0 },
        { title: "Table Number", field: "tableNumber", width: 300, responsive: 3 },
        { title: "Description", field: "description", width: 150, responsive: 2 },
        { title: "Status", field: "status", width: 200, responsive: 2 },
        { title: "Created", field: "createdAt", width: 200, responsive: 2 },
    ];

    useEffect(() => {
        const socket = initSocket();

        if (socket) {
            const handleNuevaOrden = (data) => {
                console.log("Nueva orden recibida:", data);
                setOrders((prevOrders) => [...prevOrders, data.order]);
                setNotifications((prev) => [
                    ...prev,
                    { mensaje: `Nueva orden de ${data.order.customer}` },
                ]);
            };

            socket.on("nueva-orden", handleNuevaOrden);

            return () => {
                socket.off("nueva-orden", handleNuevaOrden);
            };
        }
    }, [setOrders, setNotifications]);

    if (!chefId) return <p>Error: No se pudo obtener la sesión del usuario.</p>;
    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!orders || orders.length === 0) return <p>No se encontraron órdenes asignadas.</p>;

    return (
        <div className="main-container">
            <div className="table-container">
                <h1 className="title-table">Mis Órdenes</h1>
                <Table data={orders} columns={columns} />
            </div>
        </div>
    );
};

export default Notifications;
