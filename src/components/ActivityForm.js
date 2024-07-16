import React, { useState, useEffect } from 'react';
import './ActivityForm.css';

function ActivityForm({ activity, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (activity) {
      setName(activity.name);
      setDescription(activity.description);
      setDate(activity.date);
    } else {
      setName('');
      setDescription('');
      setDate('');
    }
  }, [activity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: activity?.id, name, description, date });
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <h3>{activity ? 'Editar Actividad' : 'Nueva Actividad'}</h3>
      <input
        type="text"
        placeholder="Nombre de la Actividad"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default ActivityForm;
