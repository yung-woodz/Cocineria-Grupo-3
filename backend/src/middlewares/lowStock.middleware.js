"use strict";

export async function lowStock(req, res, next) {
    const { quantity } = req.body;
    const stockMin = 5;

    if (quantity && quantity < stockMin) {
        res.locals.notification = {
            message: "La cantidad del producto es baja",
            type: "warning",
            productId: req.params.id || null,
        };
    }

    next();
}

    