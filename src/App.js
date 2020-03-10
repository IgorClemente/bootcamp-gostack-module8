import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  const handleSetTech = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  useEffect(() => {
    const storageTechs = localStorage.getItem('techs');

    if (storageTechs) {
      setTech(JSON.parse(storageTechs));
    }
    // return () => {} - Caso eu queira reverter algo: will unmount
  }, []);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
    // return () => {} - Caso eu queira reverter algo: will unmount
  }, [techs]);

  const techsSize = useMemo(() => {
    return techs.length;
  }, [techs]);

  return (
    <>
      <ul>
        {techs.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techsSize} tecnologias</strong>
      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={() => handleSetTech()}>
        Adicionar
      </button>
    </>
  );
}

export default App;
