import React, { useState } from 'react';

function AdminStudentsPage() {
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')) || []);
  const [newStudent, setNewStudent] = useState('');

  const addStudent = () => {
    const updatedStudents = [...students, { email: newStudent }];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setNewStudent('');
  };

  return (
    <div>
      <h2>Lista de Estudiantes Registrados</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.email}</li>
        ))}
      </ul>
      <input
        type="email"
        value={newStudent}
        onChange={(e) => setNewStudent(e.target.value)}
        placeholder="Correo del estudiante"
      />
      <button onClick={addStudent}>Agregar Estudiante</button>
    </div>
  );
}

export default AdminStudentsPage;
