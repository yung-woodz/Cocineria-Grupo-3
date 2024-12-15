import { useState, useEffect } from "react";
import { updateDish } from '@services/dishes.service';
import { showSuccessAlert, showErrorAlert } from '../../helpers/sweetAlert';

export default function useUpdateDish(dishData, fetchDishes, onClose) {
    const [errors] = useState({});
    const [formData, setFormData] = useState({
        //donde se almacenan
        Nombre: "",
        descripcion: "",
        precio: "",
        tiempoDeEspera: "",
        disponibilidad: "disponible",
        image: "",
        DishProducts: [],
    });

    useEffect(() => {
        if (dishData) {
            //para actualizar los datos del platillo
            const updatedFormData = {
                Nombre: dishData.Nombre || "",
                descripcion: dishData.descripcion || "",
                precio: dishData.precio || "",
                tiempoDeEspera: dishData.tiempoDeEspera || "",
                disponibilidad: dishData.disponibilidad || "disponible",
                image: dishData.image || "",
                DishProducts: Array.isArray(dishData.DishProducts)
                    ? dishData.DishProducts.map((dp) => ({
                        productId: dp.product?.id || "",
                        quantity: dp.quantity || "",
                    }))
                    : [],
            };
            setFormData(updatedFormData);
        }
    }, [dishData]);
    //para actualizar los datos del platillo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    //actualiza los productos dentro del platillo
    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...formData.DishProducts];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setFormData((prevData) => ({ ...prevData, DishProducts: updatedProducts }));
    };
    const handleAddProduct = () => {
        setFormData((prevData) => ({
            ...prevData,
            DishProducts: [...prevData.DishProducts, { productId: "", quantity: "" }],
        }));
    };
    const handleRemoveProduct = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            DishProducts: prevData.DishProducts.filter((_, i) => i !== index),
        }));
    };
    //actualiza el platillo
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDish(formData, { id: dishData.id });
            await fetchDishes();
            showSuccessAlert("¡Éxito!", "Platillo actualizado correctamente.");
            onClose();
        } catch (error) {
            console.error("Error al actualizar el platillo:", error);
            //errores detallados del backend
            const errorDetails = error.response?.data?.details;
            if (errorDetails) {
                showErrorAlert("Error al Actualizar", errorDetails);
            } else {
                showErrorAlert("Error", "Ocurrió un error inesperado.");
            }
            onClose();
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleProductChange,
        handleAddProduct,
        handleRemoveProduct,
        handleSubmit,
    };
}