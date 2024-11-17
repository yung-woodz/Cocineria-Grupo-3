// pages/DishesPage.jsx
import React, { useEffect, useState } from 'react';
import { getDishes, createDish, updateDish, deleteDish } from '../services/dishes.service';
import DishList from '../components/DishList';
import DishForm from '../components/DishForm';

const DishesPage = () => {
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        const result = await getDishes();
        console.log('Fetched Dishes:', result);
        if (result.error) setError(result.error);
        else setDishes(result);
    };

    const handleCreateDish = async (newDish) => {
        const result = await createDish(newDish);
        if (!result.error) {
            console.log("Platillo creado:", result); 
            fetchDishes(); 
        } else {
            setError(result.error);
        }
    };

    const handleUpdateDish = async (updatedDish) => {
        const result = await updateDish(updatedDish, { id: updatedDish.id });
        if (!result.error) fetchDishes();
        else setError(result.error);
    };

    const handleDeleteDish = async (dishId) => {
        const result = await deleteDish({ id: dishId });
        if (!result.error) fetchDishes();
        else setError(result.error);
    };

    return (
        <div>
            <h1>Platillos</h1>
            {error && <p>Error: {error}</p>}
            <DishForm onSubmit={handleCreateDish} />
            <DishList 
                dishes={dishes} 
                onUpdate={handleUpdateDish} 
                onDelete={handleDeleteDish} 
            />
        </div>
    );
};

export default DishesPage;
