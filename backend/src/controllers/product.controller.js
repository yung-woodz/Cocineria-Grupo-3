"use strict"

import path from "path";
import { HOST, PORT } from "../config/configEnv.js";

import {
    createProductService,
    getProductService,
    getProductsService,
    updateProductService,
    deleteProductService
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

        if (req.file) {
            body.image = req.file.path;
        } else {
            return handleErrorClient(res, 400, "Imagen es requerida");
        }

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

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const [product, errorProduct] = await getProductService(id);

        if (errorProduct) return handleErrorClient(res, 404, errorProduct);

        const [deletedProduct, errorDelete] = await deleteProductService(id);

        if (errorDelete) return handleErrorClient(res, 400, errorDelete);

        return handleSuccess(res, 200, "Producto eliminado", deletedProduct);
    } catch (error) {
        return handleErrorServer(res, 500, error.message);
    }
}

export async function updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
  
      if (!id) {
        return handleErrorClient(
          res,
          400,
          "Error de validación en la consulta",
          "El id es requerido en la ruta"
        );
      }
  
      const { error: bodyError } = productValidation.validate(body, { presence: 'optional' });
  
      if (bodyError) {
        return handleErrorClient(
          res,
          400,
          "Error de validación en los datos enviados",
          bodyError.message,
        );
      }
  
      const [product, productError] = await updateProductService({ id }, body);
  
      if (productError) {
        return handleErrorClient(res, 400, "Error modificando el producto", productError);
      }
  
      handleSuccess(res, 200, "Producto modificado correctamente", product);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }