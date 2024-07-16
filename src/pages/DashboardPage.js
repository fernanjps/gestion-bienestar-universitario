import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [aids, setAids] = useState([]);
  const [news, setNews] = useState([]);
  const [newNewsItem, setNewNewsItem] = useState({ title: '', date: '', description: '' });

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem('students')) || []);
    setActivities(JSON.parse(localStorage.getItem('activities')) || []);
    setAids(JSON.parse(localStorage.getItem('aids')) || []);
    setNews(JSON.parse(localStorage.getItem('news')) || []);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleNewsInputChange = (e) => {
    const { name, value } = e.target;
    setNewNewsItem({
      ...newNewsItem,
      [name]: value
    });
  };

  const handleAddNews = () => {
    const updatedNews = [...news, { ...newNewsItem, id: new Date().getTime() }];
    setNews(updatedNews);
    localStorage.setItem('news', JSON.stringify(updatedNews));
    setNewNewsItem({ title: '', date: '', description: '' });
  };

  const handleDeleteNews = (id) => {
    const updatedNews = news.filter(newsItem => newsItem.id !== id);
    setNews(updatedNews);
    localStorage.setItem('news', JSON.stringify(updatedNews));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Bienvenido, {user.name}</h2>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </header>
      <div className="dashboard-content">
        <section className="summary-section">
          <div className="summary-card">
            <h3>Estudiantes</h3>
            <p>{students.length}</p>
          </div>
          <div className="summary-card">
            <h3>Actividades</h3>
            <p>{activities.length}</p>
          </div>
          <div className="summary-card">
            <h3>Ayudas Económicas</h3>
            <p>{aids.length}</p>
          </div>
        </section>
        <section className="quick-access-section">
          <h3>Accesos Rápidos</h3>
          <div className="quick-access-links">
            <button onClick={() => navigate('/students')}>Gestión de Estudiantes</button>
            <button onClick={() => navigate('/activities')}>Gestión de Actividades</button>
            <button onClick={() => navigate('/aids')}>Gestión de Ayudas Económicas</button>
          </div>
        </section>
        <section className="news-section">
          <h3>Noticias y Eventos</h3>
          <div className="news-list">
            {news.map(newsItem => (
              <div key={newsItem.id} className="news-item">
                <h4>{newsItem.title}</h4>
                <p>{newsItem.date}</p>
                <p>{newsItem.description}</p>
                <button onClick={() => handleDeleteNews(newsItem.id)}>Eliminar</button>
              </div>
            ))}
          </div>
          {user.role === 'admin' && (
            <div className="news-form">
              <h4>Agregar Noticia/Eventos</h4>
              <input
                type="text"
                name="title"
                placeholder="Título"
                value={newNewsItem.title}
                onChange={handleNewsInputChange}
              />
              <input
                type="date"
                name="date"
                placeholder="Fecha"
                value={newNewsItem.date}
                onChange={handleNewsInputChange}
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={newNewsItem.description}
                onChange={handleNewsInputChange}
              />
              <button onClick={handleAddNews}>Agregar</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
