import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { updateOrder } from "../../services/orders.service";

export default function OrderEditDialog({ open, onClose, orderData, fetchOrders }) {
    const [formData, setFormData] = useState({
        customer: "",
        tableNumber: "",
        description: "",
        status: "",
        username: "",
    });

    useEffect(() => {
        if (orderData) {
            setFormData({
                Customer: orderData.customer || "",
                tableNumber: orderData.tableNumber || "",
                description: orderData.description || "",
                status: orderData.status || "",
                username: orderData.username || "",
            });
        }
    }, [orderData]);

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
            const updatedOrder = {
                ...formData,
                orderItems: formData.orderItems.split(",").map((p) => p.trim()),
            };
            await updateOrder(updatedOrder, { id: orderData.id }); 
            await fetchOrders(); 
            onClose(); 
        } catch (error) {
            console.error("Error al actualizar la orden:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Orden</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="customer"
                    name="customer"
                    label="Cliente"
                    type="text"
                    fullWidth
                    value={formData.customer}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="tableNumber"
                    name="tableNumber"
                    label="Numero de Mesa"
                    type="text"
                    fullWidth
                    value={formData.tableNumber}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Mensaje"
                    type="text"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="status"
                    name="status"
                    label="Estado"
                    type="text"
                    fullWidth
                    value={formData.status}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="username"
                    name="username"
                    label="Usuario"
                    type="text"
                    fullWidth
                    value={formData.username}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}