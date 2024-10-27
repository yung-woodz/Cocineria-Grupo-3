"use strict";

import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";
import e from "express";

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

export async function updateProductService(id, productData) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne(id);

    if (!product) return [null, "Producto no encontrado"];

    productRepository.merge(product, productData);
    await productRepository.save(product);

    return [product, null];
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteProductService(id) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne(id);

    if (!product) return [null, "Producto no encontrado"];

    await productRepository.delete(id);

    return [product, null];
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateProductquantityService(id, quantity) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { id: id } });

    if (!product) return [null, "Producto no encontrado"];

    product.quantity = quantity;
    await productRepository.save(product);

    return [product, null];
  } catch (error) {
    console.error("Error al actualizar cantidad de producto:", error);
    return [null, "Error interno del servidor"];
  }
}
