"use strict";
import { EntitySchema } from "typeorm";

const OrderSchema = new EntitySchema({
    name: "Order",
    tableName: "orders",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        customer: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        tableNumber: {
            type: "int",
            nullable: false,
        },
        description:{
            type: "varchar",
            length: 255,
        },
        status: {
            type: "varchar",
            enum: ["En progreso", "Cancelado", "Entregado"],
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
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: {
                name: "userId",
                referencedColumnName: "id",
            },
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_ORDER",
            columns: ["id"],
            unique: true,
        },
    ],
});


export default OrderSchema;
