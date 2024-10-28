"use strict";
import Joi from "joi";

export const orderQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
        }),
    })
    .or("id")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing": "Debes proporcionar el parámetro id.",
    });

export const orderBodyValidation = Joi.object({
    customer: Joi.string()
        .min(5)
        .max(50)
        .messages({
        "string.empty": "El nombre del cliente no puede estar vacío.",
        "string.base": "El nombre del cliente debe ser de tipo string.",
        "string.min": "El nombre del cliente debe tener como mínimo 5 caracteres.",
        "string.max": "El nombre del cliente debe tener como máximo 50 caracteres.",
        }),
    tableNumber: Joi.number()
        .integer()
        .positive()
        .messages({
        "number.base": "El número de mesa debe ser un número.",
        "number.integer": "El número de mesa debe ser un número entero.",
        "number.positive": "El número de mesa debe ser un número positivo.",
        }),
    total: Joi.number()
        .integer()
        .positive()
        .messages({
        "number.base": "El total debe ser un número.",
        "number.integer": "El total debe ser un número entero.",
        "number.positive": "El total debe ser un número positivo.",
        }),
    status: Joi.string()
        .min(5)
        .max(50)
        .messages({
        "string.empty": "El estado no puede estar vacío.",
        "string.base": "El estado debe ser de tipo string.",
        "string.min": "El estado debe tener como mínimo 5 caracteres.",
        "string.max": "El estado debe tener como máximo 50 caracteres.",
        }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
    });

export const orderStatusValidation = Joi.object({
    status: Joi.string()
        .min(5)
        .max(50)
        .messages({
        "string.empty": "El estado no puede estar vacío.",
        "string.base": "El estado debe ser de tipo string.",
        "string.min": "El estado debe tener como mínimo 5 caracteres.",
        "string.max": "El estado debe tener como máximo 50 caracteres.",
        }),
})
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
    });
