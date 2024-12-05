import Grid from '@mui/material/Grid';
import OrderCard from './OrderCard';
import useGetOrders from '../hooks/order/useGetOrders';

const OrderCardList = () => {
    const { orders, fetchOrders} = useGetOrders();

    return (
        <Grid container spacing={2} justifyContent="center">
            {orders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                    <OrderCard order={order} onDelete={() => fetchOrders()} />
                </Grid>
            ))}
        </Grid>
    );
};

export default OrderCardList;