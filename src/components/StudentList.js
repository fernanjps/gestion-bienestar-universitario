import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const handleAddOrUpdateStudent = (student) => {
    let updatedStudents;
    if (selectedStudent) {
      updatedStudents = students.map((s) => (s.matricula === student.matricula ? student : s));
    } else {
      updatedStudents = [...students, student];
    }
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setSelectedStudent(null);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleDeleteStudent = (matricula) => {
    const updatedStudents = students.filter((student) => student.matricula !== matricula);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="student-list-page">
      <h2>Gestión de Estudiantes</h2>
      <div className="students-controls">
        <input
          type="text"
          placeholder="Buscar estudiantes"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSelectedStudent(null)}>Nuevo Estudiante</button>
      </div>
      <StudentForm student={selectedStudent} onSave={handleAddOrUpdateStudent} />
      <div className="student-list">
        <h3>Lista de Estudiantes Registrados</h3>
        {filteredStudents.length === 0 ? (
          <p>No hay estudiantes registrados</p>
        ) : (
          filteredStudents.map((student, index) => (
            <div key={index} className="student-item">
              <h4>{student.fullName}</h4>
              <p>Matrícula: {student.matricula}</p>
              <p>Email: {student.email}</p>
              <p>Teléfono: {student.phone}</p>
              <p>Cursos: {student.courses}</p>
              <p>Carrera: {student.career}</p>
              <p>Semestre: {student.semester}</p>
              <button onClick={() => handleEditStudent(student)}>Editar</button>
              <button onClick={() => handleDeleteStudent(student.matricula)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentList;
