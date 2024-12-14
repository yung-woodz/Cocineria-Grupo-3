import { deleteOrder } from "../../services/order.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

const useDeleteOrder = (fetchOrders, setOrders) => {
    const handleDelete = async (orderId) => {
        try {
            const result = await deleteDataAlert(); // Mostrar confirmación
            if (result.isConfirmed) {
                const response = await deleteOrder(orderId); // Llamar al servicio para eliminar la orden
                if (response.status === "Error del cliente") {
                    return showErrorAlert("Error", response.details);
                }
                showSuccessAlert("¡Eliminado!", "La orden ha sido eliminada correctamente.");
                
                // Actualizar las órdenes sin recargar
                await fetchOrders();
            } else {
                showErrorAlert("Cancelado", "La operación ha sido cancelada.");
            }
        } catch (error) {
            console.error("Error al eliminar la orden:", error);
            showErrorAlert("Error", "Ocurrió un error al eliminar la orden.");
        }
    };

    return { handleDelete };
};

export default useDeleteOrder;
