import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        id: startCase(user.id),
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}
export function formatDishData(dish) {
    return {
        id: dish.id,
        Nombre: startCase(dish.Nombre),
        requiredProducts: (() => {
            if (Array.isArray(dish.requiredProducts)) {
                return dish.requiredProducts;
            }
            if (typeof dish.requiredProducts === "string") {
                try {
                    return JSON.parse(dish.requiredProducts); // Parsear como JSON si es posible
                } catch {
                    return [dish.requiredProducts]; // Si no, convertir a arreglo
                }
            }
            return []; // Si no es válido, devolver un arreglo vacío
        })(),
        disponibilidad: startCase(dish.disponibilidad),
        descripcion: dish.descripcion || 'Sin descripción',
        tiempoDeEspera: dish.tiempoDeEspera || 0,
        precio: dish.precio || 0,  
        imagen: dish.imagen || '',  // Usa la URL de la imagen o un string vacío si no está disponible
        createdAt: formatTempo(dish.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(dish.updatedAt, "DD-MM-YYYY")
    };
}

export function formatProductData(product) {
    return {
        ...product,
        name: startCase(product.name),
        type: startCase(product.type),
        quantity: product.quantity,
        entryDate: product.entryDate,
        expirationDate: product.expirationDate
    };
}

export function formatProductData(product) {
    return {
        ...product,
        name: startCase(product.name),
        type: startCase(product.type),
        quantity: product.quantity,
        entryDate: product.entryDate,
        expirationDate: product.expirationDate
    };
}

export function convertirMinusculas(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].toLowerCase();
        }
    }
    return obj;
}

export function formatPostUpdate(user) {
    return {
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        email: user.email,
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}