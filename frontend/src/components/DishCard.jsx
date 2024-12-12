import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, List, ListItem } from "@mui/material";

const DishCard = ({ dish, onDelete, onEdit }) => {
    // Obtener el rol del usuario desde sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = userData ? userData.rol : null;

    return (
        <Card sx={{ maxWidth: 345, margin: "auto" }}>
            <CardMedia
                component="img"
                height="140"
                image={dish.image}
                alt={dish.Nombre}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {dish.Nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {dish.descripcion}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="bold" mt={1}>
                    Precio: ${dish.precio}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                    Tiempo de Espera: {dish.tiempoDeEspera} min
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                    Disponibilidad: {dish.disponibilidad ? "Sí" : "No"}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="bold" mt={2}>
                    Ingredientes:
                </Typography>
                <List>
                    {dish.DishProducts && dish.DishProducts.length > 0 ? (
                        dish.DishProducts.map((dishProduct, index) => (
                            <ListItem key={index} sx={{ padding: "0", fontSize: "0.9rem" }}>
                                - {dishProduct.name || "Producto desconocido"}: {dishProduct.quantity} unidades
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Sin ingredientes asociados
                        </Typography>
                    )}
                </List>
            </CardContent>
            <CardActions>
                {userRole === "administrador" && (
                    <>
                        <Button size="small" color="error" onClick={() => onDelete(dish.id)}>
                            Eliminar
                        </Button>
                        <Button size="small" color="primary" onClick={() => onEdit(dish)}>
                            Editar
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default DishCard;
