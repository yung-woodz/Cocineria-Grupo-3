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
        .min(5)
        .max(35)
        .pattern(/^(?!.*\s{2,})[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El Nombre del Platillo no puede estar vacío.",
            "string.base": "El Nombre del Platillo  debe ser de tipo string.",
            "string.min":"El Nombre del Platillo  debe tener como mínimo 10 caracteres.",
            "string.pattern.base": "El Nombre del Platillo solo puede contener letras, tildes y espacios simples.",
        })
})
    .or("id", "Nombre")
    .unknown(true)
    .messages({
        "object.unknown": "Campo desconocido en la solicitud.",
        "object.missing":"Debes proporcionar al menos un parámetro: id o Nombre.",
    });
    
export const dishBodyValidation = Joi.object({
    Nombre: Joi.string()
        .min(5)
        .max(50)
        .pattern(/^(?!.*\s{2,})[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre del platillo no puede estar vacío.",
            "string.base": "El nombre del platillo debe ser de tipo string.",
            "string.min": "El nombre del platillo debe tener como mínimo 10 caracteres.",
            "string.max": "El nombre del platillo debe tener como máximo 50 caracteres.",
            "string.pattern.base":"El nombre del platillo solo puede contener letras y espacios.",
        }),
    descripcion: Joi.string()
        .min(5)
        .max(500)
        .pattern(/^(?!.*\s{2,})[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,]+$/)
        .messages({
            "string.base": "La descripción debe ser de tipo texto.",
            "string.empty": "La descripción no puede estar vacía.",
            "string.base": "La descripción debe ser de tipo texto.",
            "string.min": "La descripción debe tener como mínimo 10 caracteres.",
            "string.max": "La descripción debe tener como máximo 500 caracteres.",
            "string.pattern.base": "La descripción solo puede contener letras, números, espacios y los caracteres especiales: . , -",
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
        .min(0)
        .max(1000000)
        .messages({
            "number.base": "El precio debe ser un número.",
            "number.positive": "El precio debe ser un número positivo.",
            "number.min": "El precio debe ser de minimo 1 peso.",
            "number.max": "El precio no puede ser mayor a 1,000,000.", 
            "any.required": "El precio es un campo obligatorio.",
        }),
        image: Joi.string()
        .uri()
        .messages({
            "string.base": "La imagen debe ser de tipo string.",
            "string.uri": "La imagen debe ser una URL válida.",

        }),
    disponibilidad: Joi.string()
        .messages({
        "boolean.base": "La disponibilidad debe ser verdadera (true) o falsa (false).",
    }),
    isAvailable: Joi.boolean().messages({
        "boolean.base": "El estado de disponibilidad debe ser verdadero o falso.",
    }),

    DishProducts: Joi.array()
    .items(
        Joi.object({
            productId: Joi.number().integer().positive().required()
                .messages({
                    "number.base": "El ID del producto debe ser un número.",
                    "number.integer": "El ID del producto debe ser un número entero.",
                    "number.positive": "El ID del producto debe ser un número positivo.",
                    "any.required": "El ID del producto es obligatorio.",
                }),
            quantity: Joi.number().integer().positive().required()
                .messages({
                    "number.base": "La cantidad debe ser un número.",
                    "number.integer": "La cantidad debe ser un número entero.",
                    "number.positive": "La cantidad debe ser un número positivo.",
                    "any.required": "La cantidad es obligatoria.",
                }),
        })
    )
    .messages({
        "array.base": "DishProducts debe ser un arreglo.",
        "array.includes": "DishProducts debe contener objetos válidos.",
    }),
})
    .or("Nombre","Ingredientes")
    .unknown(false)
    .messages({
        "object.unknown": "Campo desconocido en la solicitud.",
        "object.missing":"Debes proporcionar al menos un campo: Nombre o Ingredientes.",
    });

