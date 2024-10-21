"use strict";
import {
    getOrderService,
    getOrdersService,
} from "../services/order.service.js";
import {
    orderBodyValidation,
    orderQueryValidation,
} from "../validations/order.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

/* export async function createOrder(req, res) {
    try {
      const { body } = req;
  
      const { error } = authValidation.validate(body);
  
      if (error) {
        return handleErrorClient(res, 400, "Error de validación", error.message);
      }
      const [accessToken, errorToken] = await createOrderService(body);
  
      if (errorToken) return handleErrorClient(res, 400, "Error iniciando sesión", errorToken);
  
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
  
      handleSuccess(res, 200, "Orden creada exitosamente", { token: accessToken });
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
} */

export async function getOrder(req, res) {
    try {
      const { id } = req.query;
  
      const { error } = orderQueryValidation.validate({ id });
  
      if (error) return handleErrorClient(res, 400, error.message);
  
      const [order, errorOrder] = await getOrderService({ id });
  
      if (errorOrder) return handleErrorClient(res, 404, errorOrder);
  
      handleSuccess(res, 200, "Usuario encontrado", order);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
}

export async function getOrders(req, res) {
    try {
      const [orders, errorOrders] = await getOrdersService();
  
      if (errorOrders) return handleErrorClient(res, 404, errorOrders);
  
      orders.length === 0
        ? handleSuccess(res, 204)
        : handleSuccess(res, 200, "Ordenes encontradas", orders);
    } catch (error) {
      handleErrorServer(
        res,
        500,
        error.message,
      );
    }
}