import React, { useState } from 'react';

const DishForm = ({ onSubmit }) => {
    
    const [form, setForm] = useState({
        Nombre: '',
        requiredProducts: '',
        disponibilidad: 'disponible',
        descripcion: '',
        tiempoDeEspera: '',
        precio: '',
        imagen: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            Nombre: '',
            requiredProducts: '',
            disponibilidad: 'disponible',
            descripcion: '',
            tiempoDeEspera: '',
            precio: '',
            imagen: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="Nombre"
                value={form.Nombre}
                onChange={handleChange}
                placeholder="Nombre del platillo"
            />
            <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
            />
            <input
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleChange}
                placeholder="Precio"
            />
            <input
                name="tiempoDeEspera"
                type="number"
                value={form.tiempoDeEspera}
                onChange={handleChange}
                placeholder="Tiempo de espera (minutos)"
            />
            <input
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                placeholder="URL de la imagen"
            />
            <textarea
                name="requiredProducts"
                value={form.requiredProducts}
                onChange={handleChange}
                placeholder="Productos necesarios (separados por comas)"
            />
            <select name="disponibilidad" value={form.disponibilidad} onChange={handleChange}>
                <option value="disponible">Disponible</option>
                <option value="no disponible">No Disponible</option>
            </select>
            <label>
                Disponible
                <input
                    type="checkbox"
                    name="isAvailable"
                    checked={form.isAvailable}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Guardar Platillo</button>
        </form>
    );
};

export default DishForm;
