// src/context/DataContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [aids, setAids] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const activitiesResponse = await fetch('/data/activities.json');
      const activitiesData = await activitiesResponse.json();
      setActivities(activitiesData);

      const aidsResponse = await fetch('/data/aids.json');
      const aidsData = await aidsResponse.json();
      setAids(aidsData);

      const studentsResponse = await fetch('/data/students.json');
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ activities, aids, students }}>
      {children}
    </DataContext.Provider>
  );
};