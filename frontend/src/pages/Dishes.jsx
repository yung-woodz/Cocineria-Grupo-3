import React, { useState } from "react";
import useGetDishes from "../hooks/dish/useGetDishes";
import useDeleteDish from "../hooks/dish/useDeleteDish";
import DishCard from "../components/DishCard"; 
import UpdatePopup from "../components/UpdatePopup";
import { useNavigate } from "react-router-dom";

import { Box, Grid, TextField, Select, MenuItem, IconButton, InputAdornment, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DishesPage = () => {
    const navigate = useNavigate();
    const { dishes, fetchDishes, loading } = useGetDishes();
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("Nombre");
    const [sortOrder, setSortOrder] = useState("asc");

    const [selectedDish, setSelectedDish] = useState(null); 
    const [showEditDialog, setShowEditDialog] = useState(false); 

    const { handleDelete } = useDeleteDish(fetchDishes, () => {});

    const handleEdit = (dish) => {
        setSelectedDish(dish); 
        setShowEditDialog(true); 
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    if (loading) {
        return (
            <Typography variant="h6" align="center" sx={{userSelect: 'none',}}>
                Cargando platillos...
            </Typography>
        );
    }

    return (
        <Box padding={2}>
            <Typography variant="h4" align="center" sx={{userSelect: 'none',}} gutterBottom>
                Platillos
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Box display="flex" alignItems="center">
                    <Select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        style={{
                            backgroundColor: "#FFC107",
                            height: "35px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            marginRight: "10px",
                        }}
                    >
                        <MenuItem value="Nombre">Nombre</MenuItem>
                        <MenuItem value="descripcion">Descripción</MenuItem>
                        <MenuItem value="tiempoDeEspera">Tiempo de Espera</MenuItem>
                        <MenuItem value="precio">Precio</MenuItem>
                        <MenuItem value="disponibilidad">Disponibilidad</MenuItem>
                    </Select>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={`Buscar ${filterBy}`}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            backgroundColor: "#fff",
                            fontSize: "14px",
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={toggleSortOrder} aria-label="Cambiar orden">
                        {sortOrder === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {dishes.length > 0 ? (
                    dishes.map((dish) => (
                        <Grid item xs={12} sm={6} md={4} key={dish.id}>
                            <DishCard
                                dish={dish}
                                onEdit={() => handleEdit(dish)}
                                onDelete={() => handleDelete([dish.id])}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ width: "100%", marginTop: 2 }}
                    >
                        No hay platillos disponibles.
                    </Typography>
                )}
            </Grid>
            <div className="relative h-screen">
                <button
                    className="fixed bottom-5 right-5 w-16 h-16 bg-[#FFC107] text-black rounded-full text-2xl shadow-lg hover:bg-blue-600 focus:outline-none"
                    onClick={() => navigate('/create-dish')}
                >
                    +
                </button>
            </div>
            <UpdatePopup
                open={showEditDialog}
                onClose={() => setShowEditDialog(false)}
                dishData={selectedDish}
                fetchDishes={fetchDishes}
            />
        </Box>
    );
};

export default DishesPage;
