"use strict"
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
        Ingredientes: {
            type: "varchar",
            length: 100,
            nullable: true,
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
            name:"IDX_NAME",
            columns: ["Nombre"],
            unique: true,
        },
    ]
})

export default DishSchema;