"use strict";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createProductService(dataProduct) {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const newProduct = productRepository.create({
            name: dataProduct.name,
            type: dataProduct.type,
            quantity: dataProduct.quantity,
            expirationDate: dataProduct.expirationDate
        });

        const userSaved = await productRepository.save(newProduct);

        return [userSaved, null];
    }catch (error) {
        console.error("Error al crear el producto:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getProductService(query) {
    try {
        const { id, name, type } = query;

        const productRepository = AppDataSource.getRepository(Product);

        const productFound = await productRepository.findOne({
            where: [{ id: id }, { name: name }, { type: type }],
        });

        if (!productFound) return [null, "Producto no encontrado"];

        return [productFound, null];
    }catch (error) {
        console.error("Error al obtener el producto:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getProductsService() {
    try {
        const productRepository = AppDataSource.getRepository(Product);

        const products = await productRepository.find();

        if (!products || products.length === 0) return [null, "No hay productos"];

        return [products, null];
    }catch (error) {
        console.error("Error al obtener los productos:", error);
        return [null, "Error interno del servidor"];
    }
}