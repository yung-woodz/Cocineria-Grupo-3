import React from "react";
import DishForm from "../hooks/dish/DishForm";
import { createDish } from "../services/dishes.service";

const CreateDishForm = () => {
    const handleCreate = async (newDish) => {
        const formattedDish = {
            ...newDish,
            requiredProducts: Array.isArray(newDish.requiredProducts)
                ? newDish.requiredProducts
                : newDish.requiredProducts.split(",").map((p) => p.trim()),
            tiempoDeEspera: Number(newDish.tiempoDeEspera),
            precio: Number(newDish.precio),
        };


        try {
            const response = await createDish(formattedDish);
            console.log("Platillo creado con éxito");
        } catch (error) {
            console.error("Error inesperado:", error.response?.data || error.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Crear Nuevo Platillo</h2>
            <DishForm onSubmit={handleCreate} />
        </div>
    );
};

export default CreateDishForm;
