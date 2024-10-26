"use strict";
import {
    createDishService,
    getDishService,
    getDishesService,
    updateDishesService,
    deleteDishService,
} from "../services/dish.service.js";
import {
    dishBodyValidation,
    dishQueryValidation,
} from "../validations/dish.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export  async function createDish(req, res) { //!modificar con el check
    try{
        const {body}=req;

        const {error} = dishQueryValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [newDish, errorDish] = await createDishService(body);

        if (errorDish) return handleErrorClient(res, 404, errorDish);

        handleSuccess(res, 200, "Platillos creado", newDish);
        
    }catch (error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function getDish(req, res) {
    try {
        const { Nombre, id,} = req.query;

        const { error } = dishQueryValidation.validate({ Nombre, id,});

        if (error) return handleErrorClient(res, 400, error.message);

        const [dish, errorDish] = await getDishService({ Nombre, id, });

        if (errorDish) return handleErrorClient(res, 404, errorDish);

        handleSuccess(res, 200, "Platillos encontrado", dish);
    } catch (error) {
    handleErrorServer(res, 500, error.message);
    }
}

export async function getDishes(req, res) {
    try {
        const [dishes, errorDishes] = await getDishesService();
        
        if (errorDishes) return handleErrorClient(res, 404, errorDishes);
        
        dishes.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Platillos encontrados", dishes);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateDish(req, res) {//!modificar con el chequeo
    try {
        const { Nombre, id,} = req.query;
        const { body } = req;

        const { error: queryError } = dishQueryValidation.validate({
            Nombre,
            id,
        });

        if (queryError) {
            return handleErrorClient(
            res,
            400,
            "Error de validación en la consulta",
            queryError.message,
        );
        }//aca

        const { error: bodyError } = dishBodyValidation.validate(body);//aca

        if (bodyError)
            return handleErrorClient(
            res,
            400,
            "Error de validación en los datos enviados",
            bodyError.message,
            );

        const [dish, dishError] = await updateDishesService({ Nombre, id }, body);

        if (dishError) return handleErrorClient(res, 400, "Error modificando al Platillo", userError);

        handleSuccess(res, 200, "Platillo modificado correctamente", dish);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
        }
}

export async function deleteDish(req, res) {
    try {
        const { Nombre, id,} = req.query;
        
        const { error: queryError } = dishQueryValidation.validate({
            Nombre,
            id,
        });
        
        if (queryError) {
            return handleErrorClient(
            res,
            400,
            "Error de validación en la consulta",
            queryError.message,
        );
        }
        
        const [dishDelete, errorDishDelete] = await deleteDishService({
            Nombre,
            id,
        });
        
        if (errorDishDelete) return handleErrorClient(res, 404, "Error eliminado al Platillo", errorUserDelete);

        handleSuccess(res, 200, "Platillo eliminado correctamente", dishDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
