import { Button, Card, CardContent, CardActions, Typography } from '@mui/material';

const OrderCard = ({ order, onDelete, onEdit }) => {
    console.log(order);
    if (!order) {
        return <p>Información de la orden no disponible</p>;
    }

    return (
        <Card sx={{ maxWidth: 345, margin: "auto" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Orden: {order.id || 'Sin ID'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cliente: {order.customer || 'Sin cliente'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mesa: {order.tableNumber || 'Sin número de mesa'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Descripción: {order.description || 'Sin descripción'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Estado: {order.status || 'Sin estado'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Usuario: {order.user?.nombreCompleto || 'Sin usuario'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="error" onClick={() => onDelete(order.id)}>
                    Eliminar
                </Button>
                <Button size="small" color="primary" onClick={() => onEdit(order)}>
                    Editar
                </Button>
            </CardActions>
        </Card>
    );
};

export default OrderCard;
