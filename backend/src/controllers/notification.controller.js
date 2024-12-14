"use strict";
import { sendNotificationService } from "../services/notification.service.js";

export async function sendNotification(req, res) {
    try {
        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({ message: "Falta el ID de la orden" });
        }

        const response = await sendNotificationService(orderId);

        return res.status(200).json({
            status: "Success",
            message: response.message,
            data: response.order,
        });
    } catch (error) {
        console.error("Error en el controlador de notificaciones:", error);
        return res.status(500).json({
            status: "Error",
            message: "Error al enviar la notificación",
        });
    }
}
