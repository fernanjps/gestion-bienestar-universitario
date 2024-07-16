import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Asegúrate de tener el CSS en un archivo adecuado

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const toggleMenu = () => {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    sidebarMenu.classList.toggle('open');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-button" onClick={toggleMenu}>Abrir Menú</button>
        <h1>Gestión de Bienestar Universitario</h1>
        {user && (
          <nav>
            <ul className="nav-links">
              <li><Link to="/dashboard">Inicio</Link></li>
              <li className="dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                  Servicios
                </button>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/activities">Actividades</Link></li>
                    <li><Link to="/aids">Ayudas Económicas</Link></li>
                    <li><Link to="/psychological-help">Ayuda Psicológica</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/students">Estudiantes</Link></li>
              <li><Link to="/profile">Perfil</Link></li>
            </ul>
          </nav>
        )}
        {user && (
          <div className="user-info">
            <span>Bienvenido, {user.name}</span>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
