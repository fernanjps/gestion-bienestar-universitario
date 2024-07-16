import React, { useState, useEffect } from 'react';
import './StudentsPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    course: '',
    level: '',
    photoUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleRegisterStudent = () => {
    const photoUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';
    const newStudent = { ...formData, photoUrl };
    const newStudents = [...students, newStudent];
    setStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
    alert('Estudiante registrado con éxito');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      course: '',
      level: '',
      photoUrl: ''
    });
    setSelectedFile(null);
    setDropdownOpen(false); // Close the dropdown after registering
  };

  return (
    <div className="students-page">
      <h2>Gestión de Estudiantes</h2>
      <button className="dropdown-button" onClick={handleToggleDropdown}>
        {isDropdownOpen ? 'Cerrar' : 'Ver / Registrar Estudiantes'}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="student-list">
            <h3>Estudiantes Registrados</h3>
            <ul>
              {students.map((student, index) => (
                <li key={index}>
                  <img src={student.photoUrl} alt={`${student.name}'s profile`} className="student-photo" />
                  <div className="student-info">
                    <p>Nombre: {student.name}</p>
                    <p>Email: {student.email}</p>
                    <p>Teléfono: {student.phone}</p>
                    <p>Dirección: {student.address}</p>
                    <p>Curso: {student.course}</p>
                    <p>Nivel: {student.level}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="student-form">
            <h3>Registrar Estudiante</h3>
            <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} required />
            <input type="text" name="course" placeholder="Curso" value={formData.course} onChange={handleChange} required />
            <input type="text" name="level" placeholder="Nivel" value={formData.level} onChange={handleChange} required />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleRegisterStudent}>Registrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;