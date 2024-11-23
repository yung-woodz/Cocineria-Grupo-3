import { deleteDish } from '@services/dishes.service';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '../../helpers/sweetAlert';

const useDeleteDish = (fetchDishes, setDataDish) => {
    const handleDelete = async (dataDishIds) => {
        if (dataDishIds.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    for (const id of dataDishIds) {
                        const response = await deleteDish(id);
                        if (response.status === 'Client error') {
                            showErrorAlert('Error', response.details);
                            return;
                        }
                    }
                    showSuccessAlert('¡Eliminado!','El Platillo ha sido eliminados correctamente.');
                    await fetchProducts();
                    setDataProduct([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el Platillo:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar Los Platillos.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteDish;
