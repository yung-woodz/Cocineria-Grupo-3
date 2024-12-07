"use strict";
import Dish from "../entity/dish.entity.js";
import Product from "../entity/product.entity.js"; 
import { AppDataSource } from "../config/configDb.js";

export async function createDishService(body) {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);
        // requiredProducts es una array que guarda el nombre y su acantidad
        const newDish = dishRepository.create({
            ...body,
            requiredProducts: body.requiredProducts,
        });
        
        await dishRepository.save(newDish);
    
        return [newDish, null];
    } catch (error) {
        console.error("Error al crear el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function getDishService(query) {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);
        const { Nombre, id } = query;

        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id }],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        const productRepository = AppDataSource.getRepository(Product);
        const requiredProducts = dishFound.requiredProducts;

        let isAvailable = true;
        // Verifica la disponibilidad de cada producto requerido.
        for (const item of requiredProducts) {
            const product = await productRepository.findOne({
                where: { name: item.name },
            });
            if (!product || product.quantity < item.quantity) {
                isAvailable = false;
                break;
            }
        }
        // Actualiza el estado de disponibilidad del platillo si cambió.
        if (dishFound.isAvailable !== isAvailable) {
            dishFound.isAvailable = isAvailable;
            await dishRepository.save(dishFound);
        }

        return [dishFound, null];
    } catch (error) {
        console.error("Error al obtener el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}

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
        const dishRepository = AppDataSource.getRepository(Dish);
        const productRepository = AppDataSource.getRepository(Product);

        const dishFound = await dishRepository.findOne({
            where: [{ id: query.id }],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        const requiredProducts = [];
         // Verifica cada producto requerido.
        for (const item of body.requiredProducts) {
            const productFound = await productRepository.findOne({ where: { name: item.name } });

            if (!productFound) {
                return [null, `Producto "${item.name}" no encontrado en el inventario`];
            }

            if (productFound.quantity < item.quantity) {
                return [null, `Cantidad insuficiente de "${item.name}" en el inventario`];
            }
            // Agrega el producto verificado con la cantidad necesaria.
            requiredProducts.push({
                name: productFound.name,
                quantity: item.quantity,
            });
        }

        const dataDishUpdate = {
            Nombre: body.Nombre,
            descripcion: body.descripcion,
            tiempoDeEspera: body.tiempoDeEspera,
            precio: body.precio,
            disponibilidad: body.disponibilidad,
            imagen: body.imagen,
            requiredProducts, // Actualizar los productos requeridos
            updatedAt: new Date(),
        };

        await dishRepository.update({ id: dishFound.id }, dataDishUpdate);

        const updatedDish = await dishRepository.findOne({ where: { id: dishFound.id } });

        return [updatedDish, null];
    } catch (error) {
        console.error("Error al actualizar el Platillo:", error);
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