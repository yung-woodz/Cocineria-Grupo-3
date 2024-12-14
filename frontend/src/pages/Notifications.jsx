import React, { useEffect } from "react";
import Table from "@components/Table";
import useGetOrdersByChef from "@hooks/order/useGetOrdersByChef";
import { initSocket } from '../services/notification.service.js';
import "@styles/users.css";

const Notifications = () => {
    const user = JSON.parse(sessionStorage.getItem("usuario")); // se obtiene el usuario de la sesión
    const chefId = user?.id; // ID del usuario autenticado
    const { orders, setOrders, loading, error } = useGetOrdersByChef(chefId);

    /* console.log("Chef ID detectado:", chefId);
    console.log("Usuario en sesión:", sessionStorage.getItem("usuario")); */

    const columns = [
        { title: "Customer", field: "customer", width: 350, responsive: 0 },
        { title: "Table Number", field: "tableNumber", width: 300, responsive: 3 },
        { title: "Description", field: "description", width: 150, responsive: 2 },
        /* { title: "Total", field: "total", width: 200, responsive: 2 }, */
        { title: "Status", field: "status", width: 200, responsive: 2 },
        { title: "Created", field: "createdAt", width: 200, responsive: 2 },
    ];

    useEffect(() => {
        // Inicializa la conexión al WebSocket
        const socket = initSocket();

        if (socket) {
            // Maneja nuevas órdenes recibidas en tiempo real
            const handleNuevaOrden = (data) => {
                console.log("Nueva orden recibida:", data);
                setOrders((prevOrders) =>
                    [...(Array.isArray(prevOrders) ? prevOrders : []), data.order]
                );
            };

            // Escucha el evento "newOrder" del servidor
            socket.on("nueva-orden", handleNuevaOrden);

            // Limpia los eventos cuando el componente se desmonta
            return () => {
                if (socket) {
                    socket.off("nueva-orden", handleNuevaOrden);
                }
            };
        }
    }, [setOrders]);

    if (!chefId) return <p>Error: No se pudo obtener la sesión del usuario</p>;
    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!orders || orders.length === 0) return <p>No se encontraron órdenes asignadas</p>;

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Mis Órdenes</h1>
                </div>
                <Table
                    data={orders}
                    columns={columns}
                    initialSortName={"customer"}
                />
            </div>
        </div>
    );
};

export default Notifications;
