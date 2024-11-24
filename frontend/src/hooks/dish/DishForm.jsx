import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

const DishForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        Nombre: "",
        requiredProducts: "",
        disponibilidad: "disponible",
        descripcion: "",
        tiempoDeEspera: "",
        precio: "",
        imagen: "",
        isAvailable: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            requiredProducts: form.requiredProducts.split(",").map((p) => p.trim()), // Convierte a un arreglo
        });
        setForm({
            Nombre: "",
            requiredProducts: "",
            disponibilidad: "disponible",
            descripcion: "",
            tiempoDeEspera: "",
            precio: "",
            imagen: "",
            isAvailable: false,
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                padding: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 600,
                margin: "auto",
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Crear Nuevo Platillo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="Nombre"
                        label="Nombre del Platillo"
                        variant="outlined"
                        fullWidth
                        value={form.Nombre}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="descripcion"
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={form.descripcion}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="precio"
                        label="Precio"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={form.precio}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="tiempoDeEspera"
                        label="Tiempo de Espera (minutos)"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={form.tiempoDeEspera}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="imagen"
                        label="URL de la Imagen"
                        variant="outlined"
                        fullWidth
                        value={form.imagen}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="requiredProducts"
                        label="Productos Necesarios"
                        variant="outlined"
                        fullWidth
                        value={form.requiredProducts}
                        onChange={handleChange}
                        helperText="Separar los productos con comas"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="disponibilidad"
                        label="Disponibilidad"
                        select
                        variant="outlined"
                        fullWidth
                        value={form.disponibilidad}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="disponible">Disponible</MenuItem>
                        <MenuItem value="no disponible">No Disponible</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isAvailable"
                                checked={form.isAvailable}
                                onChange={handleChange}
                            />
                        }
                        label="Disponible"
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 150 }}>
                        Guardar Platillo
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DishForm;
