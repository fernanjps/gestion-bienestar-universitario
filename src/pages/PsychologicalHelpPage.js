import React, { useState, useEffect } from 'react';
import './PsychologicalHelpPage.css';

const PsychologicalHelpPage = () => {
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem('psychologicalSessions')) || [];
    setSessions(storedSessions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSession = () => {
    const newSessions = [...sessions, formData];
    setSessions(newSessions);
    localStorage.setItem('psychologicalSessions', JSON.stringify(newSessions));
    setFormData({
      title: '',
      description: '',
      date: ''
    });
  };

  const handleDeleteSession = (index) => {
    const newSessions = sessions.filter((_, i) => i !== index);
    setSessions(newSessions);
    localStorage.setItem('psychologicalSessions', JSON.stringify(newSessions));
  };

  return (
    <div className="psychological-help-page">
      <h2>Ayuda Psicológica</h2>
      <div className="session-form">
        <h3>Registrar Nueva Sesión</h3>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button onClick={handleAddSession}>Agregar Sesión</button>
      </div>
      <div className="session-list">
        <h3>Sesiones Registradas</h3>
        {sessions.map((session, index) => (
          <div className="session-item" key={index}>
            <h4>{session.title}</h4>
            <p>{session.description}</p>
            <p>{session.date}</p>
            <button onClick={() => handleDeleteSession(index)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsychologicalHelpPage;
