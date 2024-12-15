import { useState } from "react";
import { createDish } from "../../services/dishes.service";
import Swal from "sweetalert2";

const useCreateDish = () => {
    const [form, setForm] = useState({
        Nombre: "",
        descripcion: "",
        tiempoDeEspera: "",
        precio: "",
        disponibilidad: "disponible",
        image: "",
        DishProducts: [],
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleAddProduct = () => {
        setForm({
            ...form,
            DishProducts: [...form.DishProducts, { productId: "", quantity: "" }],
        });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = form.DishProducts.filter((_, i) => i !== index);
        setForm({ ...form, DishProducts: updatedProducts });
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...form.DishProducts];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setForm({ ...form, DishProducts: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        try {
            const formData = new FormData();
            formData.append("Nombre", form.Nombre);
            formData.append("descripcion", form.descripcion);
            formData.append("tiempoDeEspera", form.tiempoDeEspera);
            formData.append("precio", form.precio);
            formData.append("disponibilidad", form.disponibilidad);
            formData.append("image", form.image);
    
            form.DishProducts.forEach((product, index) => {
                formData.append(`DishProducts[${index}][productId]`, product.productId);
                formData.append(`DishProducts[${index}][quantity]`, product.quantity);
            });
    
            const response = await createDish(formData); // Asegúrate de que esta llamada se complete correctamente
    
            // Mostrar éxito solo si la respuesta fue correcta
            Swal.fire({
                icon: "success",
                title: "Platillo creado",
                text: "El platillo fue creado exitosamente.",
                confirmButtonText: "OK",
            });
    
            // Limpieza del formulario
            setForm({
                Nombre: "",
                descripcion: "",
                tiempoDeEspera: "",
                precio: "",
                disponibilidad: "disponible",
                image: "",
                DishProducts: [],
            });
        } catch (error) {
            console.log("Error capturado:", error.response?.data || error.message);
            const responseErrors = error.response?.data || { message: "Error inesperado" };
            setErrors(responseErrors.details || {});
    
            Swal.fire({
                icon: "error",
                title: "Error",
                text: responseErrors.message || "Por favor, intenta nuevamente.",
                confirmButtonText: "OK",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return {
        form,
        isSubmitting,
        errors,
        handleChange,
        handleFileChange,
        handleAddProduct,
        handleRemoveProduct,
        handleProductChange,
        handleSubmit,
    };
};

export default useCreateDish;
