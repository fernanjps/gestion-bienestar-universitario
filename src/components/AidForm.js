import React, { useState, useEffect } from 'react';
import './AidForm.css';

function AidForm({ aid, onSave }) {
  const [form, setForm] = useState({
    name: '',
    type: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    if (aid) {
      setForm(aid);
    } else {
      setForm({
        name: '',
        type: '',
        amount: '',
        description: ''
      });
    }
  }, [aid]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      name: '',
      type: '',
      amount: '',
      description: ''
    });
  };

  return (
    <form className="aid-form" onSubmit={handleSubmit}>
      <h3>{aid ? 'Editar Ayuda' : 'Nueva Ayuda'}</h3>
      <label>Nombre:</label>
      <input type="text" name="name" value={form.name} onChange={handleChange} required />
      <label>Tipo de Ayuda:</label>
      <input type="text" name="type" value={form.type} onChange={handleChange} required />
      <label>Monto:</label>
      <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
      <label>Descripción:</label>
      <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
      <button type="submit">{aid ? 'Guardar Cambios' : 'Registrar Ayuda'}</button>
    </form>
  );
}

export default AidForm;
