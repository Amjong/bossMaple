import React, { useCallback, useState } from 'react';
import CharacterTable from './CharacterTable';
import InputBar from './InputBar';

export default function CharacterInfo() {
  const [needUpdate, setNeedUpdate] = useState(false);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('fwefwf');
    setNeedUpdate(true);
  }, []);
  return (
    <div>
      <InputBar handleSubmit={handleSubmit}></InputBar>
      {needUpdate && <CharacterTable />}
    </div>
  );
}
