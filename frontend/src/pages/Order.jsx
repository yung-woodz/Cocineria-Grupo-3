import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../services/order.service";
import useUsers from "@hooks/users/useGetUsers";
import useGetDishes from "@hooks/dish/useGetDishes";
import { initSocket } from "../services/notification.service.js";
import { Box, Grid, TextField, Button, MenuItem, Typography, CircularProgress } from "@mui/material";
import { use } from "react";


const Order = ({ onClose }) => {
    const [orderData, setOrderData] = useState({
        customer: "",
        tableNumber: "",
        description: "",
        status: "En progreso",
        dishes: "",
        username: ""
    });
    const [loading, setLoading] = useState(false);
    const { users, fetchUsers } = useUsers();
    const { dishes, fetchDishes } = useGetDishes();


    useEffect(() => {
        fetchDishes();
    }, []);



    const handleChange = (e) => { 
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Crear la orden en el backend
            /* const response = await createOrder(orderData); */
            
            /* const socket = initSocket();

            // Emitir el evento WebSocket para notificar al cocinero
            socket.emit('nueva-orden', response.data); */
            //sirve para buscar el id del plato y asignarlo a la orden
            const dish = dishes.find(dish => dish.Nombre === orderData.dishes);
            const formattedData = {
                ...orderData,
                dishes: [{ dishId: dish.id, quantity: 1 }]
            }
            console.log(formattedData)
            await createOrder(formattedData);
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
                dishes: "",
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
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="dishes"
                        required
                        fullWidth
                        select
                        label="Plato"
                        value={orderData.dishes}
                        onChange={handleChange}
                    >
                        {dishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.Nombre}>
                                {dish.Nombre}
                            </MenuItem>
                        ))}
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

