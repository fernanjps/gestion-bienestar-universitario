import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role is user
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    if (!formData.email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    return errors;
  };

  const handleRegister = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(user => user.email === formData.email)) {
        alert('Este correo electrónico ya está registrado');
        return;
      }
      const newUser = { ...formData };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Usuario registrado con éxito');
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <div className="register-form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <label>
          Confirmar Contraseña:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </label>
        <label>
          Rol:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <button onClick={handleRegister}>Registrar</button>
        <button onClick={() => navigate('/login')}>
          ¿Ya tienes una cuenta? Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
