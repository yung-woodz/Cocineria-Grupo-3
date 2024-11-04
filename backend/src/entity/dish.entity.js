"use strict";
import { EntitySchema } from "typeorm";

const DishSchema = new EntitySchema({
    name: "Dish",
    tableName: "dishes",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        Nombre: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        disponibilidad: { 
            type: "varchar",
            length: 20, 
            default: "disponible" 
        },
        descripcion: { 
            type: "text", 
            nullable: true 
        },
        tiempoDeEspera: { 
            type: "int", 
            nullable: true 
        },
        requiredProducts: {
            type: "json", 
            nullable: true,
        },
        isAvailable: {
            type: "boolean",
            default: true,
            nullable: false,
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
    indices: [
        {
            name: "IDX_DISH",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_NAME",
            columns: ["Nombre"],
            unique: true,
        },
    ]
});

export default DishSchema;
