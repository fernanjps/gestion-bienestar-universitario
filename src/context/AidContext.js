import React, { createContext, useState, useEffect } from 'react';

export const AidContext = createContext();

export const AidProvider = ({ children }) => {
  const [aids, setAids] = useState([]);

  useEffect(() => {
    const storedAids = localStorage.getItem('aids');
    if (storedAids) {
      setAids(JSON.parse(storedAids));
    }
  }, []);

  const addAid = (aid) => {
    const updatedAids = [...aids, aid];
    setAids(updatedAids);
    localStorage.setItem('aids', JSON.stringify(updatedAids));
  };

  return (
    <AidContext.Provider value={{ aids, addAid }}>
      {children}
    </AidContext.Provider>
  );
};