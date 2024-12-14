import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../services/order.service";
import useUsers from "@hooks/users/useGetUsers";
import { Box, Grid, TextField, Button, MenuItem, Typography, CircularProgress } from "@mui/material";

const Order = ({ onClose }) => {
    const [orderData, setOrderData] = useState({
        customer: "",
        tableNumber: "",
        description: "",
        status: "En progreso",
        username: ""
    });
    const [loading, setLoading] = useState(false);
    const { users, fetchUsers } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
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
                username: ""
            });
            onClose();
            window.location.reload();
        } catch (error) {
            alert("Error al crear la orden" + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: 4,
                overflow: "hidden"
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Crear Orden
            </Typography>
            <Grid container spacing={2} maxWidth="sm">
                <Grid item xs={12}>
                    <TextField
                        name="customer"
                        required
                        fullWidth
                        label="Cliente"
                        value={orderData.customer}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="tableNumber"
                        required
                        fullWidth
                        label="Número de mesa"
                        value={orderData.tableNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="description"
                        required
                        fullWidth
                        label="Descripción"
                        multiline
                        value={orderData.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="status"
                        required
                        fullWidth
                        select
                        label="Estado"
                        value={orderData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="En progreso">En progreso</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                        <MenuItem value="Entregado">Entregado</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="username"
                        required
                        fullWidth
                        select
                        label="Cocinero"
                        value={orderData.username}
                        onChange={handleChange}
                    >
                        {users.filter(user => user.rol.toLowerCase() === "cocinero").map((cook) => (
                            <MenuItem key={cook.rut} value={cook.nombreCompleto}>
                                {cook.nombreCompleto}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, backgroundColor: "#212121" }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Crear orden"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Order;

