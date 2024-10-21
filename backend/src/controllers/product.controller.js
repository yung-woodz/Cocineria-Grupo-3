"use strict"
import {
    createProductService,
    getProductService,
    getProductsService,
} from "../services/product.service.js";

import {
    productValidation,
} from "../validations/product.validation.js";

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createProduct(req, res) {
    try {
        const { body } = req;

        const { error } = productValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [product, errorProduct] = await createProductService(body);

        if (errorProduct) return handleErrorClient(res, 400, errorProduct);

        handleSuccess(res, 201, "Producto creado", product);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProduct(req, res) {
    try {
        const { id } = req.query;

        const [product, errorProduct] = await getProductService(id);

        if (errorProduct) return handleErrorClient(res, 404, errorProduct);

        handleSuccess(res, 200, "Producto encontrado", product);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProducts(req, res) {
    try {
        const [products, errorProducts] = await getProductsService();

        if (errorProducts) return handleErrorClient(res, 404, errorProducts);

        products.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Productos encontrados", products);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

