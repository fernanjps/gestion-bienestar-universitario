import React, { useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({ student, onSave }) {
  const [form, setForm] = useState({
    fullName: '',
    matricula: '',
    email: '',
    phone: '',
    courses: '',
    career: '',
    semester: ''
  });

  useEffect(() => {
    if (student) {
      setForm(student);
    } else {
      setForm({
        fullName: '',
        matricula: '',
        email: '',
        phone: '',
        courses: '',
        career: '',
        semester: ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const newStudents = student
      ? storedStudents.map((s) => (s.matricula === form.matricula ? form : s))
      : [...storedStudents, form];
    localStorage.setItem('students', JSON.stringify(newStudents));
    setForm({
      fullName: '',
      matricula: '',
      email: '',
      phone: '',
      courses: '',
      career: '',
      semester: ''
    });
    alert(`Estudiante ${student ? 'actualizado' : 'registrado'} con éxito`);
    onSave();
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h3>{student ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h3>
      <label>Nombre Completo:</label>
      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
      <label>Matrícula:</label>
      <input type="text" name="matricula" value={form.matricula} onChange={handleChange} required />
      <label>Correo Electrónico:</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} required />
      <label>Teléfono:</label>
      <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
      <label>Cursos:</label>
      <input type="text" name="courses" value={form.courses} onChange={handleChange} required />
      <label>Carrera:</label>
      <input type="text" name="career" value={form.career} onChange={handleChange} required />
      <label>Semestre:</label>
      <input type="text" name="semester" value={form.semester} onChange={handleChange} required />
      <button type="submit">{student ? 'Guardar Cambios' : 'Registrar Estudiante'}</button>
    </form>
  );
}

export default StudentForm;
