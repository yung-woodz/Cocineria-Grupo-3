import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid,IconButton, } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { updateDish } from "../services/dishes.service";
import { showSuccessAlert } from "../helpers/sweetAlert";
export default function DishEditDialog({ open, onClose, dishData, fetchDishes }) {
    const [formData, setFormData] = useState({
        Nombre: "",
        descripcion: "",
        precio: "",
        tiempoDeEspera: "",
        disponibilidad: "disponible",
        imagen: "",
        requiredProducts: [],
    });

    useEffect(() => {
        if (dishData) {
            setFormData({
                Nombre: dishData.Nombre || "",
                descripcion: dishData.descripcion || "",
                precio: dishData.precio || "",
                tiempoDeEspera: dishData.tiempoDeEspera || "",
                disponibilidad: dishData.disponibilidad || "disponible",
                imagen: dishData.imagen || "",
                requiredProducts: dishData.requiredProducts || [],
            });
        }
    }, [dishData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...formData.requiredProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: value,
        };
        setFormData((prevData) => ({
            ...prevData,
            requiredProducts: updatedProducts,
        }));
    };

    const handleAddProduct = () => {
        setFormData((prevData) => ({
            ...prevData,
            requiredProducts: [...prevData.requiredProducts, { name: "", quantity: "" }],
        }));
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = formData.requiredProducts.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            requiredProducts: updatedProducts,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDish(formData, { id: dishData.id });
            await fetchDishes();
            showSuccessAlert("¡Éxito!", "Platillo actualizado correctamente.");
            onClose();
        } catch (error) {
            console.error("Error al actualizar el platillo:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Platillo</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="Nombre"
                    name="Nombre"
                    label="Nombre del Platillo"
                    type="text"
                    fullWidth
                    value={formData.Nombre}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    id="precio"
                    name="precio"
                    label="Precio"
                    type="number"
                    fullWidth
                    value={formData.precio}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    id="tiempoDeEspera"
                    name="tiempoDeEspera"
                    label="Tiempo de Espera (minutos)"
                    type="number"
                    fullWidth
                    value={formData.tiempoDeEspera}
                    onChange={handleChange}
                    required
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Productos Requeridos:
                </Typography>
                {formData.requiredProducts.map((product, index) => (
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
                    sx={{ mt: 1 }}
                >
                    Agregar Producto
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
}