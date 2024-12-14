"use strict";
import { EntitySchema } from "typeorm";

const DishProductSchema = new EntitySchema({
    name: "DishProduct",
    tableName: "dishes_products",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        quantity: {
            type: "int",
            nullable: false,
        }
    },
    relations: {
        dish: {
            type: "many-to-one",
            target: "Dish",
            joinColumn: { name: "dishId" },
            onDelete: "CASCADE"
        },
        product: {
            type: "many-to-one",
            target: "Product",
            joinColumn: { name: "productId" },
            onDelete: "CASCADE"
        }
    }
});

export default DishProductSchema;
