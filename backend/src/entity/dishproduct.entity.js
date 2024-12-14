"use strict";
import { EntitySchema } from "typeorm";

//entidad entre dish y product para la cantidad 
const DishProductSchema = new EntitySchema({
    name: "DishProduct",
    tableName: "dish_product",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
            unique: true,
        },
        quantity: {
            type: "int",
            nullable: false, // Cantidad requerida del ingrediente
        },
    },
    relations: {
        dish: {
            target: "Dish",
            type: "many-to-one",
            joinColumn: true, // Crea la columna de unión en esta tabla
            nullable: false,
        },
        product: {
            target: "Product",
            type: "many-to-one",
            joinColumn: true, // Crea la columna de unión en esta tabla
            nullable: false,
        },
    },
});

export default DishProductSchema;