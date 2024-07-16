import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const handleAddOrUpdateStudent = (student) => {
    let updatedStudents;
    if (selectedStudent) {
      updatedStudents = students.map((s) => (s.id === student.id ? student : s));
    } else {
      student.id = new Date().getTime();
      updatedStudents = [...students, student];
    }
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setSelectedStudent(null);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div className="admin-students-page">
      <h2>Administrar Estudiantes</h2>
      <StudentForm student={selectedStudent} onSave={handleAddOrUpdateStudent} />
      <StudentList students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default AdminStudentsPage;
