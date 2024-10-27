"use strict";
import {
    createOrderService,
    deleteOrderService,
    getOrderService,
    getOrdersService,
    updateOrderService,
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

export async function getOrder(req, res) {
    try {
        const { id } = req.query;

        const { error } = orderQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [order, errorOrder] = await getOrderService({ id });

        if (errorOrder) return handleErrorClient(res, 404, errorOrder);

        handleSuccess(res, 200, "Orden encontrada", order);
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

export async function createOrder(req, res) {
    try {
        const { body } = req;

        const { error } = orderBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [order, errorOrder] = await createOrderService(body);

        if (errorOrder) return handleErrorClient(res, 404, errorOrder);
        handleSuccess(res, 201, "Orden creada", order);
        body.startTime= new Date();

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateOrder(req, res) {
    try {
        const { id } = req.query;
        const { body } = req;

        const { error: queryError } = orderQueryValidation.validate({
            id,
        });

        if (queryError) {
            return handleErrorClient(res, 400, queryError.message);
        }

        const { error: bodyError } = orderBodyValidation.validate(body);

        if (bodyError) {
            return handleErrorClient(res, 400, bodyError.message);
        }

        const [order, errorOrder] = await updateOrderService({ id, body });

        if (errorOrder) return handleErrorClient(res, 404, errorOrder);

        handleSuccess(res, 200, "Orden actualizada", order);
        
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteOrder(req, res) {
    try {
        const { id } = req.query;

        const { error } = orderQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [order, errorOrder] = await deleteOrderService({ id });

        if (errorOrder) return handleErrorClient(res, 404, errorOrder);

        handleSuccess(res, 200, "Orden eliminada", order);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function acceptOrder(req, res) {
    try {
        const { id } = req.query;

        const { error } = orderQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [order, errorOrder] = await updateOrderService({
            id,
            body: { status: "accepted" },
        });

        if (errorOrder) return handleErrorClient(res, 404, errorOrder);

        handleSuccess(res, 200, "Orden aceptada", order);
        body.endTime = new Date();
        body.totalTime = Math.round((body.endTime - order.startTime) / 1000); // Duración en segundos
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}