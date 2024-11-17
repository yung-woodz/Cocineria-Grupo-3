import { startCase } from 'lodash';
import { format as formatRut } from 'rut.js';
import { format as formatTempo } from "@formkit/tempo";

export function formatUserData(user) {
    return {
        ...user,
        nombreCompleto: startCase(user.nombreCompleto),
        rol: startCase(user.rol),
        rut: formatRut(user.rut),
        createdAt: formatTempo(user.createdAt, "DD-MM-YYYY")
    };
}
export function formatDishData(dish) {
    return {
        id: dish.id,
        nombre: startCase(dish.Nombre),
        requiredProducts: dish.requiredProducts ? dish.requiredProducts.split(',').map(prod => prod.trim()) : [],
        disponibilidad: startCase(dish.disponibilidad),
        descripcion: dish.descripcion || 'Sin descripción',
        tiempoDeEspera: dish.tiempoDeEspera ? `${dish.tiempoDeEspera} minutos` : 'No especificado',
        precio: dish.precio ? `$${dish.precio}` : 'No especificado',  // Formatea el precio
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