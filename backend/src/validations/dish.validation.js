import Joi from "joi";

export const dishQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
        "number.base": "El id debe ser un número.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser un número positivo.",
        }),
    Nombre: Joi.string()
        .min(10)
        .max(35)
        .messages({
            "string.empty": "El Nombre del Platillo no puede estar vacío.",
            "string.base": "El Nombre del Platillo  debe ser de tipo string.",
            "string.min":
            "El Nombre del Platillo  debe tener como mínimo 10 caracteres.",
            "string.max":
            "El Nombre del Platillo  debe tener como máximo 35 caracteres.",
        })
})
    .or("id", "Nombre")
    .unknown(true)
    .messages({
        "object.unknown": "soy un error",
        "object.missing":
        "Debes proporcionar al menos un parámetro: id o Nombre.",
    });

export const dishBodyValidation = Joi.object({
    Ingredientes: Joi.string()
        .min(15)
        .max(200)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre completo no puede estar vacío.",
            "string.base": "El nombre completo debe ser de tipo string.",
            "string.min": "El nombre completo debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre completo debe tener como máximo 200 caracteres.",
            "string.pattern.base":
            "El nombre completo solo puede contener letras y espacios.",
        }),
    Nombre: Joi.string()
        .min(10)
        .max(50)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre del platillo no puede estar vacío.",
            "string.base": "El nombre del platillo debe ser de tipo string.",
            "string.min": "El nombre del platillo debe tener como mínimo 10 caracteres.",
            "string.max": "El nombre del platillo debe tener como máximo 50 caracteres.",
            "string.pattern.base":
            "El nombre del platillo solo puede contener letras y espacios.",
        })
})
    .or(
        "Nombre",
        "Ingredientes"
    )
    .unknown(false)
    .messages({
        "object.unknown": "hola.",
        "object.missing":
        "Debes proporcionar al menos un campo: Nombre o Ingredientes.",
    });