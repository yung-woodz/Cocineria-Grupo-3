import { deleteProduct } from '@services/product.service';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '../../helpers/sweetAlert';

const useDeleteProduct = (fetchProducts, setDataProduct) => {
    const handleDelete = async (dataProductIds) => {
        if (dataProductIds.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    for (const id of dataProductIds) {
                        const response = await deleteProduct(id);
                        if (response.status === 'Client error') {
                            showErrorAlert('Error', response.details);
                            return false;  
                        }
                    }
                    showSuccessAlert('¡Eliminado!', 'Los productos han sido eliminados correctamente.');
                    await fetchProducts();
                    setDataProduct([]);
                    return true;  
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                    return false; 
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar los productos.');
                return false;  
            }
        }
        return false;  
    };

    return {
        handleDelete
    };
};

export default useDeleteProduct;
