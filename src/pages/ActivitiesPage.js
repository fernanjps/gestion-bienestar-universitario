import React, { useState, useEffect } from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import './ActivitiesPage.css';

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    setActivities(storedActivities);
  }, []);

  const handleAddOrUpdateActivity = (activity) => {
    let updatedActivities;
    if (selectedActivity) {
      updatedActivities = activities.map((a) =>
        a.id === activity.id ? activity : a
      );
    } else {
      activity.id = new Date().getTime();
      updatedActivities = [...activities, activity];
    }
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    setSelectedActivity(null);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id) => {
    const updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="activities-page">
      <h2>Gestión de Actividades</h2>
      <div className="activities-controls">
        <input
          type="text"
          placeholder="Buscar actividades"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSelectedActivity(null)}>Nueva Actividad</button>
      </div>
      <ActivityForm
        activity={selectedActivity}
        onSave={handleAddOrUpdateActivity}
      />
      <ActivityList
        activities={filteredActivities}
        onEdit={handleEditActivity}
        onDelete={handleDeleteActivity}
      />
    </div>
  );
}

export default ActivitiesPage;