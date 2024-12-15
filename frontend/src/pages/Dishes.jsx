import React, { useState } from "react";
import useGetDishes from "../hooks/dish/useGetDishes";
import useDeleteDish from "../hooks/dish/useDeleteDish";
import DishCard from "../components/DishCard"; 
import UpdatePopup from "../components/UpdatePopup";

import { Box, Grid, TextField, Select, MenuItem, IconButton, InputAdornment, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import{showSuccessAlert} from "../helpers/sweetAlert";

const DishesPage = () => {
    // lista de platillos 
    const { dishes, fetchDishes, loading} = useGetDishes();
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("Nombre");
    const [sortOrder, setSortOrder] = useState("asc");

    const [selectedDish, setSelectedDish] = useState(null); 
    const [showEditDialog, setShowEditDialog] = useState(false); 

   //redireccion de delete 
    const { handleDelete } = useDeleteDish(fetchDishes, () => {});
    // a edir
    const handleEdit = (dish) => {
        setSelectedDish(dish); 
        setShowEditDialog(true); 
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    // Verifica que dishes sea un arreglo antes de filtrar y ordenar
    const filteredDishes = Array.isArray(dishes)
        ? dishes
        .filter((dish) => {
        if (!filter) return true;
            const valueToFilter =
            filterBy === "tiempoDeEspera" || filterBy === "precio"
            ? dish[filterBy].toString()
            : dish[filterBy]?.toLowerCase();
            return valueToFilter.includes(filter.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a[filterBy] > b[filterBy] ? 1 : -1;
                } else {
                return a[filterBy] < b[filterBy] ? 1 : -1;
                }
            })
        : [];

    // Mostrar estado de carga
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
                {filteredDishes.length > 0 ? (
                    filteredDishes.map((dish) => (
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