import { useState, useEffect } from "react";
import { getDishes } from "@services/dishes.service.js";


const useGetDishes = () => {
    const [dishes, setDishes, ] = useState([]);
    
    const fetchDishes = async () => {
        try {
        const response = await getDishes();
        const formattedData = response.map((dish) => ({
            id: dish.id,
            Nombre: dish.Nombre,
            disponibilidad: dish.disponibilidad,
            descripcion: dish.descripcion,
            tiempoDeEspera: dish.tiempoDeEspera,
            requiredProducts: dish.requiredProducts,
            isAvailable: dish.isAvailable,
            precio: dish.precio,
            imagen: dish.imagen
        }));
        setDishes(formattedData);
        } catch (error) {
        console.error("Error: ", error);
        }
    };
    
    useEffect(() => {
        fetchDishes();
    }, []);
    
    return { dishes, fetchDishes, setDishes };
};

export default useGetDishes;