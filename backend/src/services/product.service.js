"use strict";

import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createProductService(productData) {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const newProduct = productRepository.create(productData);
    await productRepository.save(newProduct);
    return [newProduct, null];
  } catch (error) {
    console.error("Error al crear producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getProductService(id) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { id: id } });

    if (!product) return [null, "Producto no encontrado"];

    return [product, null];
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getProductsService() {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return [products, null];
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteProductService(id) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { id } });

    if (!product) return [null, "Producto no encontrado"];

    await productRepository.remove(product);

    return [product, null];
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateProductService(query, body) {
  try {
    const { id, name } = query;

    const productRepository = AppDataSource.getRepository(Product);

    const productFound = await productRepository.findOne({
      where: [{ id: id }, { name: name }],
    });

    if (!productFound) return [null, "Producto no encontrado"];

    if (body.name) {
      const existingProduct = await productRepository.findOne({
        where: { name: body.name },
      });

      if (existingProduct && existingProduct.id !== productFound.id) {
        return [null, "Ya existe un producto con el mismo nombre"];
      }
    }

    const dataProductUpdate = {};

    if (body.name) dataProductUpdate.name = body.name;
    if (body.type) dataProductUpdate.type = body.type;
    if (body.quantity) dataProductUpdate.quantity = body.quantity;
    if (body.entryDate) dataProductUpdate.entryDate = body.entryDate;
    if (body.expirationDate) dataProductUpdate.expirationDate = body.expirationDate;
    if (body.image) dataProductUpdate.image = body.image;
    dataProductUpdate.updatedAt = new Date(); 

    await productRepository.update({ id: productFound.id }, dataProductUpdate);

    const productData = await productRepository.findOne({
      where: { id: productFound.id },
    });

    if (!productData) {
      return [null, "Producto no encontrado después de actualizar"];
    }

    return [productData, null];
  } catch (error) {
    console.error("Error al modificar un producto:", error);
    return [null, "Error interno del servidor"];
  }
}