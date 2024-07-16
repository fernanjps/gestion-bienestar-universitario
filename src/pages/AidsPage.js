import React, { useState, useEffect } from 'react';
import AidForm from '../components/AidForm';
import AidList from '../components/AidList';
import './AidsPage.css';

function AidsPage() {
  const [aids, setAids] = useState([]);
  const [selectedAid, setSelectedAid] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedAids = JSON.parse(localStorage.getItem('aids')) || [];
    setAids(storedAids);
  }, []);

  const handleAddOrUpdateAid = (aid) => {
    let updatedAids;
    if (selectedAid) {
      updatedAids = aids.map((a) => (a.id === aid.id ? aid : a));
    } else {
      aid.id = new Date().getTime();
      updatedAids = [...aids, aid];
    }
    setAids(updatedAids);
    localStorage.setItem('aids', JSON.stringify(updatedAids));
    setSelectedAid(null);
  };

  const handleEditAid = (aid) => {
    setSelectedAid(aid);
  };

  const handleDeleteAid = (id) => {
    const updatedAids = aids.filter((aid) => aid.id !== id);
    setAids(updatedAids);
    localStorage.setItem('aids', JSON.stringify(updatedAids));
  };

  const filteredAids = aids.filter((aid) =>
    aid.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="aids-page">
      <h2>Gestión de Ayudas Económicas</h2>
      <div className="aids-controls">
        <input
          type="text"
          placeholder="Buscar ayudas"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => setSelectedAid(null)}>Nueva Ayuda</button>
      </div>
      <AidForm aid={selectedAid} onSave={handleAddOrUpdateAid} />
      <AidList aids={filteredAids} onEdit={handleEditAid} onDelete={handleDeleteAid} />
    </div>
  );
}

export default AidsPage;