import React from "react";
import { useNotification } from "../context/NotificationsContext";

const NotificationsToast = () => {
    const { notifications, setNotifications } = useNotification();

    const handleClose = (index) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 space-y-2">
            {notifications.map((notif, index) => (
                <div
                    key={index}
                    className="flex items-center w-full max-w-3xl p-8 mb-6 text-gray-700 bg-white rounded-2xl shadow-2xl dark:text-gray-200 dark:bg-gray-900"
                    style={{
                        backgroundColor: "#212121",
                        width: "350px", // Ancho fijo más grande
                        fontSize: "18px", // Tamaño del texto aumentado
                        border: "2px solid #FFC107", // Borde decorativo
                        justifyContent: "center", // Centrado horizontal
                        animation: "fadeIn 0.5s ease-out", // Animación suave
                    }}
                    role="alert"
                >
                    <div className="absolute items-center text-ms font-normal"
                        style={{
                            marginRight: "20px",
                        }}    
                    >
                        {notif.mensaje || "Nueva notificación"}
                    </div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        style={{
                            backgroundColor: "transparent",
                            marginRight: "-20px",
                        }}
                        aria-label="Cerrar"
                        onClick={() => handleClose(index)}
                    >
                        <span className="sr-only">Cerrar</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationsToast;
