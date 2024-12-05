import { useState, useEffect } from "react";
import useGetOrders from "../hooks/order/useGetOrders";
import useDeleteOrder from "../hooks/order/useDeleteOrder";
import OrderCard from "../components/OrderCard";
import OrderEditDialog from "../hooks/order/useEditOrder";
import { Box, Grid, TextField, Select, MenuItem, IconButton, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AllOrders = () => {
    const { orders, fetchOrders, setOrders } = useGetOrders();
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("customer");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const { handleDelete } = useDeleteOrder(fetchOrders, setOrders);


    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const filteredOrders = orders
    .filter((order) => {
        if (!filter) return true;
        const valueToFilter = (() => {
            if (filterBy === "tableNumber" || filterBy === "status") {
                return order[filterBy].toString();
            } else if (filterBy === "user") {
                return order.user?.username?.toLowerCase() || '';
            } else {
                return order[filterBy]?.toLowerCase() || '';
            }
        })();
        return valueToFilter.includes(filter.toLowerCase());
    })
    .sort((a, b) => {
        const aValue = filterBy === "user" ? a.user?.username || '' : a[filterBy];
        const bValue = filterBy === "user" ? b.user?.username || '' : b[filterBy];
        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });



    const handleEdit = (order) => {
        setSelectedOrder(order);
        setShowEditDialog(true);
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <Box padding={2}>
            <Typography variant="h4" align="center" gutterBottom>
                Órdenes
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Box display="flex" alignItems="center">
                    <Select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        style={{
                            backgroundColor: "#FFC107",
                            height: "35px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            marginRight: "10px",
                        }}
                    >
                        <MenuItem value="customer">Cliente</MenuItem>
                        <MenuItem value="tableNumber">Número de Mesa</MenuItem>
                        <MenuItem value="description">Descripción</MenuItem>
                        <MenuItem value="status">Estado</MenuItem>
                        <MenuItem value="user">Usuario</MenuItem>
                    </Select>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder={`Buscar ${filterBy}`}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            backgroundColor: "#fff",
                            fontSize: "14px",
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={toggleSortOrder} aria-label="Cambiar orden">
                        {sortOrder === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {filteredOrders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <OrderCard
                            order={order}
                            onEdit={() => handleEdit(order)}
                            onDelete={() => handleDelete(order.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            <OrderEditDialog
                open={showEditDialog}
                onClose={() => setShowEditDialog(false)}
                orderData={selectedOrder}
                fetchOrders={fetchOrders}
            />
        </Box>
    );
};

export default AllOrders;