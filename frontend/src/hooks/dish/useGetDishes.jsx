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

            if (response.error) {
                throw new Error(response.error); 
            }

            setDishes(response); // Usa directamente los datos del backend.
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

    return { dishes, fetchDishes, loading, error };
};

export default useGetDishes;
