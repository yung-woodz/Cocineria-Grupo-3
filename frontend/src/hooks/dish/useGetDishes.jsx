import { useState, useEffect } from "react";
import { getDishes } from "@services/dishes.service.js";

const useGetDishes = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDishes = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getDishes();

            if (!response || response.error) {
                throw new Error(response?.error || "Error desconocido al obtener los platillos.");
            }

            const formattedData = response.map((dish) => ({
                id: dish.id,
                Nombre: dish.Nombre,
                disponibilidad: dish.disponibilidad,
                descripcion: dish.descripcion,
                tiempoDeEspera: dish.tiempoDeEspera,
                requiredProducts: dish.requiredProducts?.map((product) => ({
                    name: product.name,
                    quantity: product.quantity,
                })) || [],
                isAvailable: dish.isAvailable,
                precio: dish.precio,
                imagen: dish.imagen,
            }));

            setDishes(formattedData);
        } catch (error) {
            console.error("Error al obtener los platillos:", error);
            setError(error.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    return { dishes, fetchDishes, setDishes, loading, error };
};

export default useGetDishes;
