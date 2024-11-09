/**
 * El sistema permite al administrador, al jefe de cocina y a los cocineros visualizar el inventario de la 
 * cocinería con la información pertinente a cada producto, permitiendo solo al administrador, ingresar y 
 * actualizar los productos almacenados. Estos a su vez se encontrarán clasificados según tipo, cantidad, 
 * fecha de ingreso y fecha de caducidad. Además el sistema notificará sobre el estado de los productos, 
 * basándose en el tiempo de caducidad.
*/

"use strict";
import { EntitySchema } from "typeorm";

const ProductSchema = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id: {
        type: "int",
        primary: true,
        generated: true,
        },
        name: {
        type: "varchar",
        length: 255,
        nullable: false,
        },
        type: {
        type: "enum",
        enum: ["lacteo", "pasta", "especia", "fruta", "vegetal","carne", "pescado", "marisco", "otros"],
        nullable: false,
        },
        quantity: {
        type: "int",
        nullable: false,
        },
        entryDate: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
        },
        expirationDate: {
        type: "timestamp with time zone",
        nullable: false,
        },
        image: {
        type: "varchar",
        length: 500,
        nullable: true,
        },
        createdAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
        },
        updatedAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: false,
        },
    },
    relations: {
        dishes: {
            type: "one-to-many",
            target: "DishProduct",
            inverseSide: "product",
            cascade: true
        }
    },
    indices: [
        {
        name: "IDX_PRODUCT",
        columns: ["id"],
        unique: true,
        },
    ],
});

export default ProductSchema;