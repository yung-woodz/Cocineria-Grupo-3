"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";

/* export async function createOrderService(order) {
    try {
      const orderRepository = AppDataSource.getRepository(Order);
      const { nombreOrden, descripcion } = order;
  
      const createErrorMessage = (dataInfo, message) => ({
        dataInfo,
        message
      });
  
      const orderFound = await orderRepository.findOne({
        where: { nombreOrden }
      });
  
      if (!orderFound) {
        return [null, createErrorMessage("email", "El correo electrónico es incorrecto")];
      }
  
      const payload = {
        nombreOrden: orderFound.nombreOrden,
        descripcion: orderFound.descripcion,
      };
  
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
  
      return [accessToken, null];
    } catch (error) {
      console.error("Error al crear orden:", error);
      return [null, "Error interno del servidor"];
    }
} */

export async function getOrderService(query) {
    try {
        const { id } = query;
    
        const orderRepository = AppDataSource.getRepository(Order);
    
        const orderFound = await orderRepository.findOne({
          where: [{ id: id }],
        });
    
        if (!orderFound) return [null, "Orden no encontrada"];
    
        const { nombreOrden, ...orderData } = orderFound;
    
        return [orderData, null];
    } catch (error) {
        console.error("Error obtener orden:", error);
        return [null, "Error interno del servidor"];
    }

}

export async function getOrdersService() {
    try {
      const orderRepository = AppDataSource.getRepository(Order);
  
      const orders = await orderRepository.find();
  
      if (!orders || orders.length === 0) return [null, "No hay ordenes"];
  
      const ordersData = orders.map(({ nombreOrden, ...order }) => order);
  
      return [ordersData, null];
    } catch (error) {
      console.error("Error al obtener a las ordenes:", error);
      return [null, "Error interno del servidor"];
    }
  }