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
      nombreOrden: {
        type: "varchar",
        length: 255,
        nullable: false,
      },
      descripcion: {
        type: String,
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
        name: "IDX_ORDER",
        columns: ["id"],
        unique: true,
      },
    ],
  });
  
  export default OrderSchema;