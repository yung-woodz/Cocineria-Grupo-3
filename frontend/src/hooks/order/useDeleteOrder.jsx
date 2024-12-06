import { deleteOrder } from "../../services/order.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

const useDeleteOrder = (fetchOrders, setDataOrder) => {
    const handleDelete = async (orderId) => {
        if (!orderId) 
            return;

        try {
            const result = await deleteDataAlert();
            if (!result.isConfirmed) {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                return;
            }

            const response = await deleteOrder(orderId);
            if (response.status >= 200 && response.status < 300) {
                showSuccessAlert('¡Eliminado!', 'La orden ha sido eliminada correctamente.');
                await fetchOrders();
                if (setDataOrder) setDataOrder([]);
            } else {
                showErrorAlert('Error', 'No se pudo eliminar la orden.');
            }
        } catch (error) {
            console.error('Error al eliminar la orden:', error);
            console.error('Detalles del error:', error.response);
            const errorMessage = error.response?.data?.message || 'Ocurrió un error al eliminar la orden.';
            showErrorAlert('Error', errorMessage);
        }
    };

    return { handleDelete };
};

export default useDeleteOrder;
