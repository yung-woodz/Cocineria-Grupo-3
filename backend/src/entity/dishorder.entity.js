"use strict";
import { EntitySchema } from "typeorm";

const DishOrderSchema = new EntitySchema({
    name: "DishOrder",
    tableName: "dishes_orders",
    columns: {
        orderId: {
            type: "int",
            primary: true, 
        },
        dishId: {
            type: "int",
            primary: true, 
        },
        quantity: {
            type: "int",
            nullable: false, 
        },
    },
    relations: {
        dish: {
            type: "many-to-one", 
            target: "Dish",
            joinColumn: { name: "dishId" },
            onDelete: "CASCADE",
        },
        order: {
            type: "many-to-one", 
            target: "Order",
            joinColumn: { name: "orderId" },
            onDelete: "CASCADE",
        },
    },
    indices: [
        {
            name: "IDX_DISH_ORDER",
            columns: ["dishId", "orderId"],
            unique: true, 
        },
    ],
});

export default DishOrderSchema;
