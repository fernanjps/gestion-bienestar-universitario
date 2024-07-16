import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    course: '',
    photoUrl: ''
  });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
    setFormData(loggedInUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result;
        const updatedData = { ...formData, photoUrl };
        saveUserData(updatedData);
      };
      reader.readAsDataURL(photoFile);
    } else {
      saveUserData(formData);
    }
  };

  const saveUserData = (data) => {
    setUser(data);
    localStorage.setItem('loggedInUser', JSON.stringify(data));
    setEditMode(false);
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="profile-page">
      <h2>Mi Perfil</h2>
      {editMode ? (
        <div className="profile-form">
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Teléfono:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Dirección:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            Curso Actual:
            <input type="text" name="course" value={formData.course} onChange={handleChange} required />
          </label>
          <label>
            Foto de Perfil:
            <input type="file" onChange={handlePhotoChange} />
          </label>
          <button onClick={handleSave}>Guardar</button>
        </div>
      ) : (
        <div className="profile-info">
          {user.photoUrl && <img src={user.photoUrl} alt={`${user.name}'s profile`} className="profile-photo" />}
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.phone}</p>
          <p>Dirección: {user.address}</p>
          <p>Curso Actual: {user.course}</p>
          <button onClick={() => setEditMode(true)}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
