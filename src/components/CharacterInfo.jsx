import React, { useCallback, useEffect, useState } from 'react';
import { getOcidUrl } from '../util/openApiManager';
import CharacterTable from './CharacterTable';
import InputBar from './InputBar';

let fetchData = async (nickname) => {
  const response = await fetch(getOcidUrl(nickname), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-nxopen-api-key': process.env.REACT_APP_MAPLE_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export default function CharacterInfo() {
  const [nickname, setNickname] = useState('');
  const [ocid, setOcid] = useState('');
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    //TODO : validate inputValue
    setNickname(inputValue);
  }, []);
  useEffect(() => {
    if (!nickname || nickname.length <= 1) {
      return;
    }
    fetchData(nickname).then((response) => {
      setOcid(response.ocid);
    });
  }, [nickname]);

  return (
    <div>
      <InputBar handleSubmit={handleSubmit}></InputBar>
      <CharacterTable ocid={ocid} />
    </div>
  );
}
