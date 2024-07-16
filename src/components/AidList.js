import React from 'react';
import './AidList.css';

function AidList({ aids, onEdit, onDelete }) {
  return (
    <div className="aid-list">
      <h3>Lista de Ayudas Económicas</h3>
      {aids.length === 0 ? (
        <p>No hay ayudas registradas</p>
      ) : (
        aids.map((aid) => (
          <div key={aid.id} className="aid-item">
            <h4>{aid.name}</h4>
            <p>Tipo: {aid.type}</p>
            <p>Monto: ${aid.amount}</p>
            <p>{aid.description}</p>
            <button onClick={() => onEdit(aid)}>Editar</button>
            <button onClick={() => onDelete(aid.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AidList;
