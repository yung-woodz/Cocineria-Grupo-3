"use strict";
import Dish from "../entity/dish.entity.js";
import Product from "../entity/product.entity.js"; 
import { AppDataSource } from "../config/configDb.js";
import { updateProductService } from "./product.service.js";
import { getProductService } from "./product.service.js";

export async function createDishService(body) {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);

        // Crear el nuevo platillo
        const newDish = dishRepository.create({
            ...body,
            requiredProducts: body.requiredProducts,
        });

        const productRepository = AppDataSource.getRepository(Product);

        const usedProducts = [];
        
        // Iterar sobre los productos requeridos y realizar la verificación y actualización
        for (const item of body.requiredProducts.product) {
            const { name, quantity } = item;

            // Buscar el producto por su nombre
            const product = await productRepository.findOne({ where: { name } });
            if (!product) {
                return [null, `Producto "${name}" no encontrado en el inventario`];
            }

            // Verificar que haya suficiente cantidad disponible
            if (product.quantity < quantity) {
                return [null, `Cantidad insuficiente de "${name}" en el inventario`];
            }

            // Descontar la cantidad requerida usando updateProductService
            const [updatedProduct, error] = await updateProductService(
                { id: product.id },
                { quantity: `-${quantity}` } // Operación de resta
            );

            if (error) {
                return [null, `Error al actualizar el producto "${name}": ${error}`];
            }

            usedProducts.push({ name: product.name, quantity });

        }
        
        // Guardar el nuevo platillo en la base de datos
        await dishRepository.save(newDish);
    
        return [{newDish, usedProducts}, null];
    } catch (error) {
        console.error("Error al crear el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function getDishService(query) {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);
        const { Nombre, id } = query;

        // Buscar el platillo por nombre o ID
        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id }],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        const requiredProducts = dishFound.requiredProducts;
        const usedProducts = [];
        let isAvailable = true;

        // Verificar si el platillo tiene productos requeridos y calcular disponibilidad
        if (requiredProducts && Array.isArray(requiredProducts.product)) {
            for (const item of requiredProducts.product) {
                const { name, quantity } = item;

                // Buscar el producto en el inventario por nombre
                const [product, error] = await getProductService({ name });

                if (!product || product.quantity < quantity) {
                    isAvailable = false; // El platillo no está disponible si algún producto no tiene suficiente cantidad
                }

                // Agregar detalles del producto al array usedProducts
                usedProducts.push({ name: product.name, quantity });
            }
        } else {
            isAvailable = false; // Si no hay productos requeridos, se considera no disponible
        }

        // Actualizar el estado de disponibilidad del platillo si ha cambiado
        if (dishFound.isAvailable !== isAvailable) {
            dishFound.isAvailable = isAvailable;
            await dishRepository.save(dishFound);
        }

        // Devolver el platillo con los productos utilizados y disponibilidad
        return [{
            dishFound,
            usedProducts // Asegurarse de incluir usedProducts en la respuesta
        }, null];
    } catch (error) {
        console.error("Error al obtener el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}

const normalizeDish = (dish) => ({
    ...dish,
    requiredProducts: Array.isArray(dish.requiredProducts)
        ? dish.requiredProducts
        : typeof dish.requiredProducts === "string"
        ? [dish.requiredProducts]
        : JSON.parse(dish.requiredProducts || "[]"),
});

export async function getDishesService() {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);

        const dishes = await dishRepository.find();

        if (!dishes || dishes.length === 0) return [null, "No hay platillos"];

        return [dishes, null]; 
    } catch (error) {
        console.error("Error al obtener a los platillos:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function updateDishesService(query, body) {
    try {
        const { Nombre, id } = query;

        const dishRepository = AppDataSource.getRepository(Dish);

        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id }],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        // Aquí se debe definir el repositorio para buscar platillos existentes
        const existingDishRepository = AppDataSource.getRepository(Dish);

        const existingDish = await existingDishRepository.findOne({
            where: { Nombre: body.Nombre },
        });

        if (existingDish && existingDish.id !== dishFound.id) {
            return [null, "Ya existe el platillo con ese nombre"];
        }

        const dataDishUpdate = {
            Nombre: body.Nombre,
            requiredProducts: body.requiredProducts,  
            descripcion: body.descripcion,
            precio: body.precio,
            tiempoDeEspera: body.tiempoDeEspera,
            disponibilidad: body.disponibilidad,
            updatedAt: new Date(),
        };

        await dishRepository.update({ id: dishFound.id }, dataDishUpdate);

        const DishData = await dishRepository.findOne({
            where: { id: dishFound.id },
        });

        if (!DishData) {
            return [null, "Platillo no encontrado después de actualizar"];
        }

        return [DishData, null];
    } catch (error) {
        console.error("Error al modificar un Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function deleteDishService(query) {
    try {
        const { Nombre, id,} = query;
        
        const dishRepository = AppDataSource.getRepository(Dish);

        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id },],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];
        
        const dishDeleted = await dishRepository.remove(dishFound);
        
        return [dishDeleted, null];
    } catch (error) {
        console.error("Error al eliminar un Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}