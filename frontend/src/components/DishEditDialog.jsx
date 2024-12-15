import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { updateDish } from "../services/dishes.service";
import useGetProducts from "../hooks/product/useGetProducts";
import { showSuccessAlert,showErrorAlert } from "../helpers/sweetAlert";

export default function DishEditDialog({ open, onClose, dishData, fetchDishes }) {
    const { products } = useGetProducts();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        Nombre: "",
        descripcion: "",
        precio: "",
        tiempoDeEspera: "",
        disponibilidad: "disponible",
        image: "",
        DishProducts: [],
    });

    useEffect(() => {
        if (dishData) {
            const updatedFormData = {
                Nombre: dishData.Nombre || "",
                descripcion: dishData.descripcion || "",
                precio: dishData.precio || "",
                tiempoDeEspera: dishData.tiempoDeEspera || "",
                disponibilidad: dishData.disponibilidad || "disponible",
                image: dishData.image || "",
                DishProducts: Array.isArray(dishData.DishProducts)
                    ? dishData.DishProducts.map((dp) => ({
                        productId: dp.product?.id || "",
                        quantity: dp.quantity || "",
                    }))
                    : [],
            };
            setFormData(updatedFormData);
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
        const updatedProducts = [...formData.DishProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: value,
        };
        setFormData((prevData) => ({
            ...prevData,
            DishProducts: updatedProducts,
        }));
    };

    const handleAddProduct = () => {
        setFormData((prevData) => ({
            ...prevData,
            DishProducts: [...prevData.DishProducts, { productId: "", quantity: "" }],
        }));
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = formData.DishProducts.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            DishProducts: updatedProducts,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Intenta actualizar el platillo
            await updateDish(formData, { id: dishData.id });
            await fetchDishes();
    
            // Solo muestra el éxito si todo salió bien
            showSuccessAlert("¡Éxito!", "Platillo actualizado correctamente.");
            onClose();
        } catch (error) {
            console.error("Error al actualizar el platillo en el frontend:", error);
    
            // Extrae los detalles del error desde el backend
            const errorDetails = error.response?.data?.details;
    
            if (!errorDetails) {
                // Muestra un mensaje genérico si no hay detalles específicos
                showErrorAlert("Error", "Ocurrió un error inesperado. Por favor, intenta nuevamente.");
                return;
            }
    
            if (typeof errorDetails === "string") {
                // Si el error es un string, muestra el mensaje directamente
                showErrorAlert("Error al Actualizar Platillo", errorDetails);
            } else {
                // Si el formato del error no es el esperado
                showErrorAlert("Error", "Formato de error inesperado.");
            }
            onClose();
        }
    };
    
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            disableEnforceFocus={false} // Actívalo o desactívalo según sea necesario
        >
            <DialogTitle id="dialog-title">Editar Platillo</DialogTitle>
            <DialogContent id="dialog-description">
                <TextField
                    margin="dense"
                    id="Nombre"
                    name="Nombre"
                    label="Nombre del Platillo"
                    type="text"
                    value={formData.Nombre}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.Nombre}
                    helperText={errors.Nombre}
                    required
                    autoFocus // Esto asegura que el foco inicial esté en este campo
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
                    error={!!errors.descripcion}
                    helperText={errors.descripcion}
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
                    error={!!errors.precio}
                    helperText={errors.precio}
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
                    error={!!errors.tiempoDeEspera}
                    helperText={errors.tiempoDeEspera}
                    required
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Productos Requeridos:
                </Typography>
                {errors.DishProducts && (
                    <Typography variant="body2" color="error">
                        {errors.DishProducts}
                    </Typography>
                )}
                {formData.DishProducts.map((product, index) => (
                    <Grid container spacing={1} key={index} alignItems="center">
                        <Grid item xs={6}>
                            <TextField
                                select
                                label="Producto"
                                value={product.productId}
                                onChange={(e) =>
                                    handleProductChange(index, "productId", e.target.value)
                                }
                                fullWidth
                                required
                            >
                                {products.map((prod) => (
                                    <MenuItem key={prod.id} value={prod.id}>
                                        {prod.name}
                                    </MenuItem>
                                ))}
                            </TextField>
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