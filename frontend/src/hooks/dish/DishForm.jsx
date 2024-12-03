import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const DishForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        Nombre: "",
        descripcion: "",
        tiempoDeEspera: "",
        precio: "",
        disponibilidad: "disponible",
        imagen: "",
        requiredProducts: [], 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...form.requiredProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: value,
        };
        setForm({ ...form, requiredProducts: updatedProducts });
    };

    const handleAddProduct = () => {
        setForm({
            ...form,
            requiredProducts: [...form.requiredProducts, { name: "", quantity: "" }],
        });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = form.requiredProducts.filter((_, i) => i !== index);
        setForm({ ...form, requiredProducts: updatedProducts });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form); 
        setForm({
            Nombre: "",
            descripcion: "",
            tiempoDeEspera: "",
            precio: "",
            disponibilidad: "disponible",
            imagen: "",
            requiredProducts: [],
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                    <Typography variant="h6">Productos Requeridos:</Typography>
                    {form.requiredProducts.map((product, index) => (
                        <Grid container spacing={1} key={index} alignItems="center">
                            <Grid item xs={6}>
                                <TextField
                                    label="Nombre del Producto"
                                    value={product.name}
                                    onChange={(e) =>
                                        handleProductChange(index, "name", e.target.value)
                                    }
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Cantidad"
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleProductChange(index, "quantity", e.target.value)
                                    }
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => handleRemoveProduct(index)}>
                                    <RemoveCircleOutlineIcon color="error" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddProduct}
                        sx={{ marginTop: 1 }}
                    >
                        Agregar Producto
                    </Button>
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="center">
                    <Button type="submit" variant="contained" color="primary">
                        Guardar Platillo
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DishForm;
