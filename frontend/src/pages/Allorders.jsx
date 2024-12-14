import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Order from './Order';

import useGetOrders from "../hooks/order/useGetOrders";
import useDeleteOrder from "../hooks/order/useDeleteOrder";
import UpdateOrderDialog from '../hooks/order/UpdateOrderDialog'; // Actualizado

const AllOrders = () => {
    const { orders, fetchOrders, setOrders } = useGetOrders();
    const { handleDelete } = useDeleteOrder(fetchOrders, setOrders);
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    // Estados para la edición
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const deleteOrderAndReload = async (orderId) => {
        try {
            await handleDelete(orderId);
            // En lugar de recargar la página, volvemos a obtener las órdenes
            fetchOrders();
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
        }
    };

    const handleCreateButtonClick = () => {
        setShowCreatePopup(true);
    };

    const handleCloseCreatePopup = () => {
        setShowCreatePopup(false);
    };

    const handleOrderSuccess = () => {
        setShowCreatePopup(false);
        fetchOrders();
    };

    // Funciones para manejar la edición
    const handleEditButtonClick = (order) => {
        setSelectedOrder(order);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6">
            {orders && orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="w-[1100px] bg-white shadow-lg rounded-md overflow-hidden border border-gray-300"
                    >
                        {/* Header */}
                        <div className="bg-[#212121] text-white p-4 flex justify-between items-center">
                            <span className="font-bold text-lg">PEDIDO #{order.id}</span>
                            <div>
                                {/* Botón de Editar */}
                                <IconButton
                                    sx={{ color: "yellow" }}
                                    onClick={() => handleEditButtonClick(order)}
                                    title="Editar pedido"
                                >
                                    <EditIcon />
                                </IconButton>

                                {/* Botón de Eliminar */}
                                <IconButton
                                    sx={{ color: "red" }}
                                    onClick={() => deleteOrderAndReload(order.id)}
                                    title="Eliminar pedido"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>  
                        {/* Body */}
                        <div className="p-6 grid grid-cols-3 gap-4">
                            {/* Left Section */}
                            <div className="text-center col-span-1">
                                <p className="text-8xl font-bold">{order.id}</p>
                                <p
                                    className={`text-4xl font-bold mt-4 ${
                                        order.status === "Entregado"
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }`}
                                >
                                    {order.status}
                                </p>
                                <p className="text-2xl text-gray-600 mt-2">
                                    MESA - {order.tableNumber}
                                </p>
                            </div>
                            {/* Right Section */}
                            <div className="col-span-2">
                                <h3 className="text-2xl font-bold">DESCRIPCIÓN:</h3>
                                <p className="text-lg text-gray-700 mt-2 leading-relaxed break-words">
                                    {order.description}
                                </p>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <p className="text-lg font-bold">
                                        MESERO: <span className="font-normal">{order.user?.nombreCompleto || "N/A"}</span>
                                    </p>
                                    <p className="text-lg font-bold">
                                        CLIENTE: <span className="font-normal">{order.customer || "N/A"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-xl text-gray-600">No hay pedidos disponibles.</p>
            )}

            {/* Botón para Crear Nueva Orden */}
            <div className="relative h-screen">
                <button
                    className="fixed bottom-5 right-5 w-16 h-16 bg-[#FFC107] text-black rounded-full text-2xl shadow-lg hover:bg-blue-600 focus:outline-none"
                    onClick={handleCreateButtonClick}
                >
                    <AddCircleIcon fontSize="large" />
                </button>

                <Dialog
                    open={showCreatePopup}
                    onClose={handleCloseCreatePopup}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle className="bg-[#212121] text-white">
                        Crear Orden
                        <IconButton
                            aria-label="cerrar"
                            onClick={handleCloseCreatePopup}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'white'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent dividers>
                        <Order onClose={handleOrderSuccess} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Diálogo para Editar Orden */}
            {selectedOrder && (
                <UpdateOrderDialog
                    open={isEditDialogOpen}
                    onClose={handleCloseEditDialog}
                    orderData={selectedOrder}
                    fetchOrders={fetchOrders}
                />
            )}
        </div>
    );
};

export default AllOrders;

