import React from 'react';
import Grid from '@mui/material/Grid';
import DishCard from './DishCard';
import useGetDishes from '@hooks/useGetDishes'; // Importamos el hook

const DishCardList = () => {
    const { dishes, fetchDishes } = useGetDishes(); // Usamos el hook para obtener los datos

    return (
        <Grid container spacing={2} justifyContent="center">
            {dishes.map((dish) => (
                <Grid item xs={12} sm={6} md={4} key={dish.id}>
                    <DishCard dish={dish} onDelete={() => fetchDishes()} /> {/* Pasamos los datos del platillo */}
                </Grid>
            ))}
        </Grid>
    );
};

export default DishCardList;
