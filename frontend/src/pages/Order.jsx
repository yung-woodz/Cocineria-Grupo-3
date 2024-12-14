import { useState } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../services/order.service";
import { io } from "socket.io-client";
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    MenuItem,
} from "@mui/material";

const Order = () => {
    const [orderData, setOrderData] = useState({
        customer: "",
        tableNumber: "",
        description: "",
        status: "En progreso",
        username: ""
    });

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Crear la orden en el backend
            const response = await createOrder(orderData);

            // Emitir el evento WebSocket para notificar al cocinero
            socket.emit("newOrder", response.data);

            await createOrder(orderData);
            Swal.fire({
                icon: "success",
                title: "Orden creada",
                text: `La orden de ${orderData.customer} ha sido creada correctamente`,
            });
            setOrderData({
                customer: "",
                tableNumber: "",
                description: "",
                status: "En progreso",
            });
        }catch (error) {
            alert("Error al crear la orden" + error.message);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 4,
                boxShadow: 3,
                maxWidth: 600,
                margin: "100px auto",
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Crear Orden
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        name="customer"
                        label="Cliente"
                        variant="outlined"
                        fullWidth
                        value={orderData.customer}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="tableNumber"
                        label="Número de mesa"
                        variant="outlined"
                        fullWidth
                        value={orderData.tableNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="description"
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        value={orderData.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="status"
                        label="Estado"
                        select
                        variant="outlined"
                        fullWidth
                        value={orderData.status}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="En progreso">En progreso</MenuItem>
                        <MenuItem value="Entregado">Entregado</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                    </TextField>
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="username"
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        value={orderData.username}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Crear Orden
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Order;