"use strict";
import Dish from "../entity/dish.entity.js";
import Product from "../entity/product.entity.js"; 
import { AppDataSource } from "../config/configDb.js";

export async function createDishService(body) {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);

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

        for (const item of requiredProducts) {
            const product = await productRepository.findOne({
                where: { name: item.name },
            });
            if (!product || product.quantity < item.quantity) {
                isAvailable = false;
                break;
            }
        }

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

        // Cambia dishesData por dishes
        return [dishes, null]; // Devolvemos 'dishes' en lugar de 'dishesData'
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
            Ingredientes: body.Ingredientes,
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