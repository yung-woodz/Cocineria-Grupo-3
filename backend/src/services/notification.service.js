"use strict";
import { io } from "socket.io"; // Importa la configuración de WebSocket
import Order from "../entity/order.entity.js";

export async function sendNotificationService(orderId) {
    try {
        // Obtiene la orden y su usuario asignado
        const orderRepository = AppDataSource.getRepository(Order);
        const order = await orderRepository.findOne({
            where: { id: orderId },
            relations: ["user"], // Relaciona con el usuario (cocinero)
        });

        if (!order) {
            throw new Error("Orden no encontrada");
        }

        const user = order.user; // Usuario asignado a la orden

        if (!user || user.rol !== "cocinero") {
            throw new Error("El usuario asignado no es un cocinero");
        }

        // Emite un evento WebSocket al cocinero asignado
        io.to(`user-${user.id}`).emit("newOrder", {
            message: "Tienes una nueva orden asignada",
            order,
        });

        console.log(`Notificación enviada al usuario: user-${user.id}`);
        return { message: "Notificación enviada correctamente", order };
    } catch (error) {
        console.error("Error al enviar notificación:", error);
        throw error;
    }
}
