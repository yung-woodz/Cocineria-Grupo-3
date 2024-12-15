"use strict";
import Dish from "../entity/dish.entity.js";
import DishProduct from "../entity/dishProduct.entity.js"; 
import { AppDataSource } from "../config/configDb.js";

export async function createDishService(body) {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);
        const dishProductRepository = AppDataSource.getRepository(DishProduct); 

        //si existe ya un platillo con el mismo nombre
        const existingDish = await dishRepository.findOne({
            where: { Nombre: body.Nombre } 
        });
        if (existingDish) return [null, "El nombre del platillo ya existe."]; 

        // se debe crear el platillo sin la relacion por si hay algun conflicto
        const newDish = dishRepository.create({
            Nombre: body.Nombre,
            descripcion: body.descripcion,
            tiempoDeEspera: body.tiempoDeEspera,
            precio: body.precio,
            disponibilidad: body.disponibilidad || "disponible",
            image: body.image,
        });

        await dishRepository.save(newDish);

    // Crear registros de DishProducts con los ingredientes  ya creados
    if (Array.isArray(body.DishProducts)) {
        for (const item of body.DishProducts) {
            const dishProduct = dishProductRepository.create({
                quantity: item.quantity,
                dish: newDish,
                product: item.productId, 
            });

        await dishProductRepository.save(dishProduct);
    }
}

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
        // relacion con el Dishproduct para ver el producto asociado al platillo
        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id }],
            relations: ["DishProducts","DishProducts.product"],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        return [dishFound, null];
    } catch (error) {
        console.error("Error al obtener el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getDishesService() {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);

        const dishes = await dishRepository.find({
            relations: ["DishProducts", "DishProducts.product"],
        });

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
        const dishProductRepository = AppDataSource.getRepository(DishProduct);

        // Buscar el platillo existente
        const dishFound = await dishRepository.findOne({
            where: { id: query.id },
            relations: ["DishProducts", "DishProducts.product"],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        // Actualizar los datos del platillo
        const dataDishUpdate = {
            Nombre: body.Nombre,
            descripcion: body.descripcion,
            tiempoDeEspera: body.tiempoDeEspera,
            precio: body.precio,
            disponibilidad: body.disponibilidad || dishFound.disponibilidad,
            image: body.image || dishFound.image,
            updatedAt: new Date(),
        };

        await dishRepository.update({ id: dishFound.id }, dataDishUpdate);

        // Manejar especifico para  DishProducts
        if (Array.isArray(body.DishProducts)) {
            // Elimina los prodcutos asociados 
            await dishProductRepository.delete({ dish: { id: dishFound.id } });

            // asocia los productos en el platillo
            for (const item of body.DishProducts) {
                const newDishProduct = dishProductRepository.create({
                    quantity: item.quantity,
                    dish: dishFound, 
                    product: { id: item.productId }, 
                });

                await dishProductRepository.save(newDishProduct);
            }
        }

        // Obtener el platillo actualizado con la relacion
        const updatedDish = await dishRepository.findOne({
            where: { id: dishFound.id },
            relations: ["DishProducts", "DishProducts.product"],
        });

        return [updatedDish, null];
    } catch (error) {
        console.error("Error al actualizar el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}



export async function deleteDishService(query) {
    try {
        const { Nombre, id } = query;

        const dishRepository = AppDataSource.getRepository(Dish);
        const dishProductRepository = AppDataSource.getRepository(DishProduct);

        // Busca el platillo
        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id }],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        // Elimina la relacion con su registro
        await dishProductRepository.delete({ dish: { id: dishFound.id } });

        // Ahora eliminar el platillo
        const dishDeleted = await dishRepository.remove(dishFound);

        return [dishDeleted, null];
    } catch (error) {
        console.error("Error al eliminar un Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}
