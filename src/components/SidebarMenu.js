import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarMenu() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <aside className="sidebar-menu">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Mi Perfil</NavLink>
          </li>
          {user && user.role === 'admin' && (
            <>
              
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/students">Gestión de Estudiantes</NavLink>
              </li>
              <li>
                <NavLink to="/activities">Gestión de Actividades</NavLink>
              </li>
              <li>
                <NavLink to="/aids">Gestión de Ayudas Económicas</NavLink>
              </li>
              <li>
                <NavLink to="/psychological-help">Ayuda Psicológica</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarMenu;
