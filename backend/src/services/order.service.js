"user strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getOrderService(query) {
    try {
        const { id } = query;
    
        const orderRepository = AppDataSource.getRepository(Order);
    
        const orderFound = await orderRepository.findOne({
        where: { id: id },
        });
    
        if (!orderFound) return [null, "Orden no encontrada"];
    
        return [orderFound, null];
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        return [null, "Error interno del servidor"];
    }
    }

export async function getOrdersService() {
    try {
        const orderRepository = AppDataSource.getRepository(Order);
    
        const orders = await orderRepository.find();
    
        if (!orders || orders.length === 0) return [null, "No hay ordenes"];
    
        return [orders, null];
    } catch (error) {
        console.error("Error al obtener las ordenes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createOrderService(body) {
    try {
        const orderRepository = AppDataSource.getRepository(Order);
    
        const newOrder = orderRepository.create(body);
    
        await orderRepository.save(newOrder);
    
        return [newOrder, null];
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateOrderService({ id }, body) {
    try {
        const orderRepository = AppDataSource.getRepository(Order);

        const orderFound = await orderRepository.findOne({ where: { id: id } });

        if (!orderFound) return [null, "Orden no encontrada"];

        
        if (!body || Object.keys(body).length === 0) {
            return [null, "No se proporcionaron valores para actualizar"];
        }

        
        const result = await orderRepository.update(id, body);

        if (result.affected === 0) {
            return [null, "No se pudo actualizar la orden"];
        }

        const orderUpdated = await orderRepository.findOne({ where: { id: id } });
        return [orderUpdated, null];
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function deleteOrderService(query) {
    try {
        const { id } = query;
    
        const orderRepository = AppDataSource.getRepository(Order);
    
        const orderFound = await orderRepository.findOne({
        where: { id: id },
        });
    
        if (!orderFound) return [null, "Orden no encontrada"];
    
        await orderRepository.delete(id);
    
        return [null, null];
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        return [null, "Error interno del servidor"];
    }
}

