import React, { createContext, useState, useEffect, useContext } from "react";
import { initSocket } from "../services/notification.service.js";

const NotificationsContext = createContext();

// Hook personalizado para usar el contexto
export const useNotification = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Inicializa el socket
        const socket = initSocket();

        if (socket) {
            // Manejar nuevas notificaciones
            const handleNuevaOrden = (data) => {
                setNotifications((prev) => [...prev, data]);
            };

            socket.on("nueva-orden", handleNuevaOrden);

            return () => {
                socket.off("nueva-orden", handleNuevaOrden);
            };
        }
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};
