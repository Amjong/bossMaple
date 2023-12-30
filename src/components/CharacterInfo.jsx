import React, { useCallback, useState } from 'react';
import CharacterTable from './CharacterTable';
import InputBar from './InputBar';

export default function CharacterInfo() {
  const [nickname, setNickname] = useState('');
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    //TODO : validate inputValue
    setNickname(inputValue);
  }, []);
  return (
    <div>
      <InputBar handleSubmit={handleSubmit}></InputBar>
      <CharacterTable nickname={nickname} />
    </div>
  );
}
