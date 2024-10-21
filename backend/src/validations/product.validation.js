"use strict";
import Joi from "joi";

const datePattern = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const validateExpirationDate = (value, helpers) => {
    const entryDate = helpers.state.ancestors[0].entryDate;
  
    if (!entryDate) return value;
  
    const entry = new Date(entryDate);
    const expiration = new Date(value);
  
    if (expiration <= entry) {
      return helpers.message("La fecha de expiración debe ser posterior a la fecha de entrada.");
    }
    return value;
};

export const productValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    name: Joi.string()
        .max(255)
        .required()
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.max": "El nombre debe tener como máximo 255 caracteres.",
        }),
    type: Joi.string()
        .max(255)
        .required()
        .messages({
            "string.empty": "El tipo no puede estar vacío.",
            "string.base": "El tipo debe ser de tipo string.",
            "string.max": "El tipo debe tener como máximo 255 caracteres.",
        }),
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "La cantidad debe ser un número.",
            "number.integer": "La cantidad debe ser un número entero.",
            "number.positive": "La cantidad debe ser un número positivo.",
            "number.required": "La cantidad es requerida.",
        }),
    entryDate: Joi.string()
        .required()
        .pattern(datePattern)
        .custom((value, helpers) => {
            const today = new Date();
            const entry = new Date(value);

            // Compara las fechas sin la parte de la hora
            if (entry < new Date(today.toISOString().split("T")[0])) {
                return helpers.message("La fecha de entrada no puede ser anterior a la fecha actual.");
            }
            return value;
        })
        .messages({
            "date.base": "La fecha de entrada debe ser una fecha.",
            "date.required": "La fecha de entrada es requerida.",
            "any.required": "La fecha de entrada es requerida.",
            "date.pattern.base": "Formato de fecha inválido, debe ser yyyy-mm-dd.",
        }),
    expirationDate: Joi.string()
        .pattern(datePattern)
        .required()
        .custom(validateExpirationDate)
        .messages({
            "date.base": "La fecha de caducidad debe ser una fecha.",
            "date.required": "La fecha de caducidad es requerida.",
            "date.min": "La fecha de caducidad debe ser mayor a la fecha de entrada.",
            "any.required": "La fecha de caducidad es requerida.",
            "date.pattern.base": "Formato de fecha inválido, debe ser yyyy-mm-dd.",
        }),
    createdAt: Joi.date()
        .messages({
            "date.base": "La fecha de creación debe ser una fecha.",
            "date.required": "La fecha de creación es requerida.",
        }),
    updatedAt: Joi.date()
        .messages({
            "date.base": "La fecha de actualización debe ser una fecha.",
            "date.required": "La fecha de actualización es requerida.",
        }),
})
    .or("id", "name", "type", "quantity", "entryDate", "expirationDate", "createdAt", "updatedAt")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id, name, type, quantity, entryDate, expirationDate, createdAt o updatedAt.",
    });
