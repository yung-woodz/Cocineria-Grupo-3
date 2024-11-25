import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { updateDish } from "../services/dishes.service";
import { showSuccessAlert } from "../helpers/sweetAlert";

export default function DishEditDialog({ open, onClose, dishData, fetchDishes }) {
    //creo que hay otra manera de hacerlo que esto
    const [formData, setFormData] = useState({
        Nombre: "",
        descripcion: "",
        precio: "",
        tiempoDeEspera: "",
        disponibilidad: "disponible",
        requiredProducts: "",
    });

    useEffect(() => {
        if (dishData) {
            setFormData({
                Nombre: dishData.Nombre || "",
                descripcion: dishData.descripcion || "",
                precio: dishData.precio || "",
                tiempoDeEspera: dishData.tiempoDeEspera || "",
                disponibilidad: dishData.disponibilidad || "disponible",
                requiredProducts: dishData.requiredProducts?.join(", ") || "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedDish = {
                ...formData,
                requiredProducts: formData.requiredProducts.split(",").map((p) => p.trim()),
            };
            await updateDish(updatedDish, { id: dishData.id }); 
            await fetchDishes(); 
            onClose(); 
        } catch (error) {
            console.error("Error al actualizar el platillo:", error);
        }
    };
    // ingresar alguna advertencia o  o el edit de imagen
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
                <TextField
                    margin="dense"
                    id="disponibilidad"
                    name="disponibilidad"
                    label="Disponibilidad"
                    type="select"
                    select
                    fullWidth
                    value={formData.disponibilidad}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={true}>Disponible</MenuItem>
                    <MenuItem value={false}>No Disponible</MenuItem>
                </TextField>
                <TextField
                    margin="dense"
                    id="requiredProducts"
                    name="requiredProducts"
                    label="Productos Asociados"
                    type="text"
                    fullWidth
                    value={formData.requiredProducts}
                    onChange={handleChange}
                    helperText="Separar los ingredientes con comas"
                />
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
