import { useState } from "react";
import { updateOrder } from "@services/order.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { formatPostUpdate } from "@helpers/formatData";

const useEditOrder = (setOrders) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataOrder, setDataOrder] = useState([]);

    const handleClickUpdate = () => {
        if (dataOrder.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedOrderData) => {
        if (!updatedOrderData || !dataOrder[0]?.id) return;
    
        try {
            const updatedOrder = await updateOrder(updatedOrderData, dataOrder[0].id);
            showSuccessAlert("¡Actualizado!", "El pedido ha sido actualizado correctamente.");
            setIsPopupOpen(false);
    
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === updatedOrder.id ? updatedOrder : order
                )
            );
    
            setDataOrder([]);
        } catch (error) {
            console.error("Error al actualizar el pedido:", error);
            showErrorAlert("Cancelado", "Ocurrió un error al actualizar el pedido.");
        }
    };
    
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataOrder,
        setDataOrder,
    };
}

export default useEditOrder;