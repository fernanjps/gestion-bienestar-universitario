
import React, { useState } from 'react';

function AdminActivitiesPage() {
  const [activities, setActivities] = useState(JSON.parse(localStorage.getItem('activities')) || []);
  const [newActivity, setNewActivity] = useState('');

  const addActivity = () => {
    const updatedActivities = [...activities, { name: newActivity }];
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    setNewActivity('');
  };

  return (
    <div>
      <h2>Lista de Actividades</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="Nombre de la actividad"
      />
      <button onClick={addActivity}>Agregar Actividad</button>
    </div>
  );
}

export default AdminActivitiesPage;
