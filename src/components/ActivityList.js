import React from 'react';
import './ActivityList.css';

function ActivityList({ activities, onEdit, onDelete }) {
  return (
    <div className="activity-list">
      <h3>Lista de Actividades</h3>
      {activities.length === 0 ? (
        <p>No hay actividades</p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <h4>{activity.name}</h4>
            <p>{activity.description}</p>
            <p>{new Date(activity.date).toLocaleDateString()}</p>
            <button onClick={() => onEdit(activity)}>Editar</button>
            <button onClick={() => onDelete(activity.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ActivityList;
