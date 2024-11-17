// components/DishList.js
import React from 'react';

const DishList = ({ dishes, onUpdate, onDelete }) => (
    <div>
        <h2>Lista de Platillos</h2>
        <ul>
            {dishes.map(dish => (
                <li key={dish.id} style={{ marginBottom: '1em', borderBottom: '1px solid #ccc', paddingBottom: '1em' }}>
                    <p><strong>Nombre:</strong> {dish.nombre}</p>
                    <p><strong>Ingredientes (Productos Requeridos):</strong> {dish.requiredProducts || 'No disponibles'}</p>
                    <p><strong>Disponibilidad:</strong> {dish.disponibilidad}</p>
                    <p><strong>Descripción:</strong> {dish.descripcion || 'No disponible'}</p>
                    <p><strong>Tiempo de Espera:</strong> {dish.tiempoDeEspera ? `${dish.tiempoDeEspera} minutos` : 'No especificado'}</p>
                    <p><strong>Precio:</strong> {dish.precio || 'No especificado'}</p>
                    <p><strong>Estado:</strong> {dish.isAvailable ? 'Disponible' : 'No disponible'}</p>
                    {dish.imagen && <img src={dish.imagen} alt={dish.nombre} style={{ width: '100px', height: '100px' }} />}
                    <button onClick={() => onUpdate(dish)}>Editar</button>
                    <button onClick={() => onDelete(dish.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    </div>
);

export default DishList;
