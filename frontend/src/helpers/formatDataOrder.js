import { startCase } from 'lodash';
import { format as formatTempo } from "@formkit/tempo";

export function formatOrderData(order) {
    return {
        ...order,
        costumer: startCase(order.costumer),
        tableNumber: startCase(order.tableNumber),
        description: startCase(order.tableNumber),
        status: startCase(order.status),
        createdAt: formatTempo(order.createdAt, "DD-MM-YYYY")
    };
}