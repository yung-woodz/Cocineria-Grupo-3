import { updateProduct } from "@services/product.service";
import { createDataAlert, showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

const useUpdateProduct = (fetchProducts) => {
    const handleUpdate = async (dataProduct, id) => {
        try {
        const result = await createDataAlert();
    
        if (result.isConfirmed) {
            const response = await updateProduct(dataProduct, id);
    
            if (response.status === "Client error") {
            showErrorAlert("Error", response.details);
            return;
            }
    
            showSuccessAlert("¡Actualizado!", "El producto ha sido actualizado correctamente.");
            await fetchProducts();
        } else {
            showErrorAlert("Cancelado", "La operación ha sido cancelada.");
        }
        } catch (error) {
        console.error("Error al actualizar el producto:", error);
        showErrorAlert("Cancelado", "Ocurrió un error al actualizar el producto.");
        }
    };
    
    return {
        handleUpdate
    };
}

export default useUpdateProduct;