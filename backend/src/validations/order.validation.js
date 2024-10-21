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
    "object.missing":
      "Debes proporcionar el parámetro: id",
  });

export const orderBodyValidation = Joi.object({
  nombreOrden: Joi.string()
    .min(15)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "El nombre de la orden no puede estar vacío.",
      "string.base": "El nombre de la orden debe ser de tipo string.",
      "string.min": "El nombre de la orden debe tener como mínimo 15 caracteres.",
      "string.max": "El nombre de la orden debe tener como máximo 50 caracteres.",
      "string.pattern.base":
        "El nombre de la orden solo puede contener letras y espacios.",
    }),
    description: Joi.string()
    .min(20)
    .max(200)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "string.empty": "La descripción no puede estar vacío.",
      "string.base": "La descripción debe ser de tipo string.",
      "string.min": "La descripción debe tener como mínimo 20 caracteres.",
      "string.max": "La descripción debe tener como máximo 200 caracteres.",
      "string.pattern.base":
        "El nombre de la orden solo puede contener letras y espacios.",
    }),
})
  .or(
    "nombreOrden",
    "description"
  )
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
      "Debes proporcionar al menos un campo: nombreOrden o description.",
  });
