"use strict";
import Dish from "../entity/dish.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createDishService(body) {
    try {
    
        const dishRepository = AppDataSource.getRepository(Dish);
    
        const newDish = dishRepository.create(body);
        
        await dishRepository.save(newDish);
    
        return [newDish, null];
            
        }catch (error){
            console.error("Error al crear el Platillo:", error);
            return [null, "Error interno del servidor"];
        }
    
}
export async function getDishService(query) {
    try {
        const { Nombre, id,} = query;

        const dishRepository = AppDataSource.getRepository(Dish);

        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id },],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        return [dishFound, null];
    } catch (error) {
        console.error("Error obtener el Platillo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getDishesService() {
    try {
        const dishRepository = AppDataSource.getRepository(Dish);

        const dishes = await dishRepository.find();

        if (!dishes || dishes.length === 0) return [null, "No hay platillos"];

        return [dishesData, null];
    } catch (error) {
        console.error("Error al obtener a los platillos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateDishesService(query, body) {
    try {
        const { Nombre, id,} = query;

        const dishRepository = AppDataSource.getRepository(Dish);

        const dishFound = await dishRepository.findOne({
            where: [{ Nombre: Nombre }, { id: id },],
        });

        if (!dishFound) return [null, "Platillo no encontrado"];

        const existingDish = await existingDish.findOne({
            where: [{ Nombre: body.Nombre }],
        });

        if (existingDish && existingDish.id !== dishFound.id) {
            return [null, "Ya existe un Platillo con el mismo rut o email"];
        }

        if (body.password) {//! no se que hace esta linea
            const matchPassword = await comparePassword(
            body.password,
            userFound.password,
        );
        
        if (!matchPassword) return [null, "La contraseña no coincide"];
        }
        
        const dataDishUpdate = {
            Nombre: body.Nombre,
            Ingredientes: body.Ingredientes,
            updatedAt: new Date(),
        };

        if (body.newPassword && body.newPassword.trim() !== "") {//!nose
            dataDishUpdate.password = await encryptPassword(body.newPassword);
        }

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