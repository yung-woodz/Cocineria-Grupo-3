"user strict";
import Order from "../entity/order.entity.js";
import User from "../entity/user.entity.js";
import Dish from "../entity/dish.entity.js";
import DishOrder from "../entity/dishorder.entity.js";
import Product from "../entity/product.entity.js";
import DishProduct from "../entity/dishproduct.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { updateProductQuantityService } from "./product.service.js";
import { query } from "express";

export async function getOrderService(query) {
    try {
        const { id } = query;
    
        const orderRepository = AppDataSource.getRepository(Order);
    
        const orderFound = await orderRepository.findOne({
            where: { id: id },
            relations: ["user"],
        });
    
        if (!orderFound) return [null, "Orden no encontrada"];
    
        return [orderFound, null];
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getOrdersByChefService({ userId }){
    try {

        const orderRepository = AppDataSource.getRepository(Order);

        const orders = await orderRepository.find({
            where: { user: { id: userId } }, // Filtra por el ID del usuario
            relations: ["user"],
        });

        if (!orders) return [null, "Orden no encontrada"];

        return [orders || [], null];

    } catch (error) {
        console.error("Error al obtener las órdenes del cocinero:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function getOrdersService() {
    try {
        const orderRepository = AppDataSource.getRepository(Order);
    
        const orders = await orderRepository.find({ relations: ["user"] });
    
        if (!orders || orders.length === 0) return [null, "No hay ordenes"];
    
        return [orders, null];
    } catch (error) {
        console.error("Error al obtener las ordenes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createOrderService(body) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { nombreCompleto: body.username } });

        if (!user) {
            return [null, "Usuario no encontrado"];
        }

        const orderRepository = AppDataSource.getRepository(Order);
        const dishProductRepository = AppDataSource.getRepository(DishProduct);
        const productRepository = AppDataSource.getRepository(Product);
        const dishOrderRepository = AppDataSource.getRepository(DishOrder);
        
        const newOrder = orderRepository.create({
            customer: body.customer,
            tableNumber: body.tableNumber,
            description: body.description,
            status: body.status,
            user: user,
        });
        
        await orderRepository.save(newOrder);
        for (const item of body.dishes) {
            const dishProducts = await dishProductRepository.find({
                where: { dish: { id: item.dishId } },
                relations: ["product"], 
            });

            if (!dishProducts || dishProducts.length === 0) {
                return [null, `El plato con ID ${item.dishId} no tiene ingredientes asignados`];
            }

            for (const dishProduct of dishProducts) {
                const product = dishProduct.product;
                const requiredQuantity = dishProduct.quantity * item.quantity; 

                if (product.quantity < requiredQuantity) {
                    return [null, `No hay suficiente cantidad del ingrediente ${product.name}`];
                }
                const [updatedProduct, error] = await updateProductQuantityService(product.id, {
                    quantity: product.quantity - requiredQuantity,
                });
                if (error) {
                    return [null, error];
                }
                
                await productRepository.save(updatedProduct);
            }

            
            const dishOrder = dishOrderRepository.create({
                orderId: { id: newOrder.id },
                dishId: item.dishId,
                quantity: item.quantity,
            });
            await dishOrderRepository.save(dishOrder);
        }



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

export async function OrderDeliveredService({ id }, body) {
    try {
        const orderRepository = AppDataSource.getRepository(Order);

        const orderFound = await orderRepository.findOne({ where: { id: id } });

        if (!orderFound) return [null, "Orden no encontrada"];

        const result = await orderRepository.update(id, body);

        if (result.affected === 0) {
            return [null, "No se pudo entregar la orden"];
        }

        const orderUpdated = await orderRepository.findOne({ where: { id: id } });
        return [orderUpdated, null];
    } catch (error) {
        console.error("Error al entregar la orden:", error);
        return [null, "Error interno del servidor"];
    }
}