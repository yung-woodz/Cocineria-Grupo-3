// components/DishForm.js
import React, { useState } from 'react';

const DishForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        Nombre: '',
        Ingredientes: '',
        disponibilidad: 'disponible',
        descripcion: '',
        tiempoDeEspera: '',
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
            Ingredientes: '',
            disponibilidad: 'disponible',
            descripcion: '',
            tiempoDeEspera: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="Nombre" value={form.Nombre} onChange={handleChange} placeholder="Nombre del platillo" />
            <input name="Ingredientes" value={form.Ingredientes} onChange={handleChange} placeholder="Ingredientes" />
            <select name="disponibilidad" value={form.disponibilidad} onChange={handleChange}>
                <option value="disponible">Disponible</option>
                <option value="no disponible">No Disponible</option>
            </select>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción"></textarea>
            <input name="tiempoDeEspera" type="number" value={form.tiempoDeEspera} onChange={handleChange} placeholder="Tiempo de espera (minutos)" />
            <button type="submit">Guardar Platillo</button>
        </form>
    );
};

export default DishForm;
