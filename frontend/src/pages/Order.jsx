import { useState } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../services/order.service";
import "@styles/order.css";
const Order = () => {
    const [orderData, setOrderData] = useState({
        customer: "",
        tableNumber: "",
        description: "",
        status: "En progreso",
        username: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => { 
        const { name, value } = e.target; // destructurando el evento para obtener el nombre y el valor del input
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createOrder(orderData);

            Swal.fire({
                icon: "success",
                title: "Orden creada",
                text: `La orden de ${orderData.customer} ha sido creada correctamente`,
            });
            setOrderData({
                customer: "",
                tableNumber: "",
                description: "",
                status: "En progreso",
            });
        }catch (error) {
            alert("Error al crear la orden" + error.message);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="request-container">
            <h1>Crear Orden</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Cliente:</label>
                    <input
                        type="text"
                        name="customer"
                        value={orderData.customer}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Número de mesa:</label>
                    <input
                        type="text"
                        name="tableNumber"
                        value={orderData.tableNumber}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={orderData.description}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Estado:</label>
                    <select
                        name="status"
                        value={orderData.status}
                        onChange={handleChange}
                    >
                        <option value="En progreso">En progreso</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Cocinero:</label>
                    <input
                        type="text"
                        name="username"
                        value={orderData.username}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear Orden"}
                </button>
            </form>
        </div>
    );
}    

export default Order;