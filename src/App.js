import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AidsPage from './pages/AidsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PsychologicalHelpPage from './pages/PsychologicalHelpPage';
import ProtectedRoute from './components/ProtectedRoute';
import SidebarMenu from './components/SidebarMenu';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminUser = { name: 'Admin', email: 'admin@admin.com', password: 'admin123', role: 'admin' };
    const userExists = users.find(user => user.email === adminUser.email);
    if (!userExists) {
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <button className="menu-button" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Cerrar Menú' : 'Abrir Menú'}
        </button>
        {isSidebarOpen && <SidebarMenu />}
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
            <Route path="/aids" element={<ProtectedRoute><AidsPage /></ProtectedRoute>} />
            <Route path="/psychological-help" element={<ProtectedRoute><PsychologicalHelpPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
