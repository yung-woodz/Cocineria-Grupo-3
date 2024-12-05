import { deleteOrder } from "../../services/order.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

const useDeleteOrder = (fetchOrders, setOrders) => {
    const handleDelete = async (orderId) => {
        if (orderId) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteOrder(orderId);
                    if (response.status === 'Error del cliente') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'La orden ha sido eliminada correctamente.');
                    await fetchOrders();
                    setOrders([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            }catch (error) {
                console.error('Error al eliminar la orden:', error);
                console.error('Detalles del error:', error.response);
                showErrorAlert('Error', 'Ocurrió un error al eliminar la orden.');
            }                
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteOrder;