// pages/DishesPage.jsx
import React, { useState } from 'react';
import useGetDishes from '../hooks/dish/useGetDishes'
import useDeleteDish from '../hooks/dish/useDeleteDish';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Box, 
    TablePagination, 
    Checkbox, 
    IconButton, 
    TextField, 
    Button, 
    MenuItem, 
    Select, 
    InputAdornment 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';


const DishesPage = () => {
    const { dishes, fetchDishes } = useGetDishes(); 
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("Nombre");
    const [sortOrder, setSortOrder] = useState("asc");
    const rowsPerPage = 5;

    const { handleDelete } = useDeleteDish(fetchDishes, setSelected);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = displayedDishes.map((dish) => dish.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleSelectClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleDeleteSelected = () => {
        handleDelete(selected);
    };

    const filteredDishes = dishes
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
        });

    const displayedDishes = filteredDishes.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            padding={2}
        >
            <TableContainer component={Paper} style={{ width: "100%", maxWidth: "900px" }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    padding="15px"
                    bgcolor="#212121"
                    color="#fff"
                >
                    <Box display="flex" alignItems="center">
                        <Select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            style={{
                                color: "#FFFFF",
                                backgroundColor: "#FFC107",
                                height: "35px",
                                fontSize: "14px",
                                borderTopLeftRadius: "4px",
                                borderBottomLeftRadius: "4px",
                                borderRight: "1px solid #212121",
                                marginRight: "-5px",
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
                                height: "35px",
                                fontSize: "14px",
                                borderTopRightRadius: "4px",
                                borderBottomRightRadius: "4px",
                                borderColor: "transparent",
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon style={{ color: "#212121" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton
                            onClick={toggleSortOrder}
                            aria-label="Cambiar orden"
                        >
                            {sortOrder === "asc" ? (
                                <ArrowDropUpIcon style={{ color: "#fff" }} />
                            ) : (
                                <ArrowDropDownIcon style={{ color: "#fff" }} />
                            )}
                        </IconButton>
                    </Box>
                    <IconButton
                        onClick={handleDeleteSelected}
                        disabled={selected.length === 0}
                        aria-label="Eliminar seleccionados"
                        style={{
                            color: selected.length === 0 ? 'lightgray' : '#FF5722',
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" align="center">
                                <Checkbox
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < displayedDishes.length
                                    }
                                    checked={
                                        displayedDishes.length > 0 &&
                                        selected.length === displayedDishes.length
                                    }
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Descripción</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Tiempo de Espera</TableCell>
                            <TableCell align="center">Disponibilidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedDishes.map((dish) => (
                            <TableRow key={dish.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.includes(dish.id)}
                                        onChange={() => handleSelectClick(dish.id)}
                                    />
                                </TableCell>
                                <TableCell align="center"> <img src={dish.imagen} alt={dish.Nombre}style={{ width: "50px", height: "50px", objectFit: "cover" }}/></TableCell>
                                <TableCell align="center">{dish.Nombre}</TableCell>
                                <TableCell align="center">{dish.descripcion}</TableCell>
                                <TableCell align="center">{dish.precio}</TableCell>
                                <TableCell align="center">{dish.tiempoDeEspera} min</TableCell>
                                <TableCell align="center">
                                    {dish.disponibilidad ? "Sí" : "No"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={filteredDishes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    sx={{
                        backgroundColor: "#212121",
                        color: "#fff",
                    }}
                />
            </TableContainer>
        </Box>
    );
};

export default DishesPage;
