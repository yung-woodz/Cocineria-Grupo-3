import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Order from './Order';

import useGetOrders from "../hooks/order/useGetOrders";
import useDeleteOrder from "../hooks/order/useDeleteOrder";

const Allorders = () => {
    const { orders, fetchOrders, setOrders } = useGetOrders();
    const { handleDelete } = useDeleteOrder(fetchOrders, setOrders);
    const [showPopup, setShowPopup] = useState(false);

    const deleteOrderAndReload = async (orderId) => {
        try {
            await handleDelete(orderId);
            window.location.reload();
        } catch (error) {
            console.error("Error al eliminar el pedido:", error);
        }
    };

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOrderSuccess = () => {
        setShowPopup(false);
        window.location.reload();
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
                            <IconButton
                                sx={{ color: "red" }}
                                onClick={() => deleteOrderAndReload(order.id)}
                                title="Eliminar pedido"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>  
                        {/* Body */}
                        <div className="p-6 grid grid-cols-3 gap-4">
                            {/* Left Section */}
                            <div className="text-center col-span-1">
                                <p className="text-8xl font-bold">{order.id}</p>
                                <p
                                    className={`text-4xl font-bold mt-4 ${order.status === "PENDIENTE"
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

            <div className="relative h-screen">
                <button
                    className="fixed bottom-5 right-5 w-16 h-16 bg-[#FFC107] text-black rounded-full text-2xl shadow-lg hover:bg-blue-600 focus:outline-none"
                    onClick={handleButtonClick}
                >
                    +
                </button>

                <Dialog
                    open={showPopup}
                    onClose={handleClosePopup}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle className="bg-[#212121] text-white">
                        Crear Orden
                        <IconButton
                            aria-label="cerrar"
                            onClick={handleClosePopup}
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
        </div>

    );
};

export default Allorders;
