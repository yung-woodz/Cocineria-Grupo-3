import { useState } from "react";
import Swal from "sweetalert2";
import { createProduct } from "@services/product.service";

const useCreateProduct = () => {
    const [form, setForm] = useState({
        name: "",
        type: "otros",
        quantity: "",
        entryDate: "",
        expirationDate: "",
        image: null,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("type", form.type);
            formData.append("quantity", form.quantity);
            formData.append("entryDate", form.entryDate);
            formData.append("expirationDate", form.expirationDate);
            if (form.image) {
                formData.append("image", form.image);
            }

            // Llamada al servicio
            const response = await createProduct(formData);

            // Confirmación con SweetAlert
            Swal.fire({
                icon: "success",
                title: "Product Created",
                text: "The product has been successfully created!",
                confirmButtonText: "OK",
            });

            // Devuelve `true` para indicar éxito
            return true;
        } catch (error) {
            // Manejo de errores
            const responseErrors = error.response?.data?.errors || { message: "An unexpected error occurred" };
            setErrors(responseErrors);

            // Mostrar error con SweetAlert
            Swal.fire({
                icon: "error",
                title: "Error",
                text: responseErrors.message || "Something went wrong. Please try again.",
                confirmButtonText: "OK",
            });

            return false;
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
        handleSubmit,
    };
};

export default useCreateProduct;
