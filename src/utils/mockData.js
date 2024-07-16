export const createMockData = () => {
    const students = [
      { email: 'estudiante1@example.com' },
      { email: 'estudiante2@example.com' },
    ];
  
    const activities = [
      { name: 'Taller de bienestar' },
      { name: 'Charla sobre salud mental' },
    ];
  
    const aids = [
      { name: 'Beca completa' },
      { name: 'Descuento en matrícula' },
    ];
  
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('activities', JSON.stringify(activities));
    localStorage.setItem('aids', JSON.stringify(aids));
  };
  