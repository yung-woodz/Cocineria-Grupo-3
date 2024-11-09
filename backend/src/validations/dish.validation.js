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
            "string.min":"El Nombre del Platillo  debe tener como mínimo 10 caracteres.",
            "string.max":"El Nombre del Platillo  debe tener como máximo 35 caracteres.",
        })
})
    .or("id", "Nombre")
    .unknown(true)
    .messages({
        "object.unknown": "Campo desconocido en la solicitud.",
        "object.missing":"Debes proporcionar al menos un parámetro: id o Nombre.",
    });

export const dishBodyValidation = Joi.object({
    Ingredientes: Joi.string()
        .min(15)
        .max(200)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "Los Ingredientes no pueden estar vacíos.",
            "string.base": "Los Ingredientes deben ser de tipo texto.",
            "string.min": "Los Ingredientes deben tener como mínimo 15 caracteres.",
            "string.max": "Los Ingredientes deben tener como máximo 200 caracteres.",
            "string.pattern.base": "Los Ingredientes solo pueden contener letras y espacios.",
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
            "string.pattern.base":"El nombre del platillo solo puede contener letras y espacios.",
        }),
        descripcion: Joi.string()
        .min(10)
        .max(500)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.pattern.base":"La descripcion solo puede contener letras y espacios.",
            "string.empty": "La descripción no puede estar vacía.",
            "string.base": "La descripción debe ser de tipo texto.",
            "string.min": "La descripción debe tener como mínimo 10 caracteres.",
            "string.max": "La descripción debe tener como máximo 500 caracteres.",
        }),
    tiempoDeEspera: Joi.number()
        .integer()
        .positive()
        .min(1)
        .max(180)
        .messages({
            "number.base": "El tiempo de espera debe ser un número.",
            "number.integer": "El tiempo de espera debe ser un número entero.",
            "number.positive": "El tiempo de espera debe ser un número positivo.",
            "number.min": "El tiempo de espera debe ser al menos 1 minuto.",
            "number.max": "El tiempo de espera no puede exceder los 180 minutos.",
        }),
        precio: Joi.number()
        .positive()
        .messages({
            "number.base": "El precio debe ser un número.",
            "number.positive": "El precio debe ser un número positivo.",
        }),
    imagen: Joi.string()
        .uri()
        .messages({
            "string.base": "La imagen debe ser de tipo string.",
            "string.uri": "La imagen debe ser una URL válida.",
        })
})
    .or("Nombre","Ingredientes")
    .unknown(false)
    .messages({
        "object.unknown": "Campo desconocido en la solicitud.",
        "object.missing":"Debes proporcionar al menos un campo: Nombre o Ingredientes.",
    });