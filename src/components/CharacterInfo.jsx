import { useCallback, useEffect, useState } from 'react';
import { getOcidFromNickname } from '../util/openApiManager';
import CharacterTable from './CharacterTable';
import InputBar from './InputBar';

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
    getOcidFromNickname(nickname).then((response) => {
      setOcid(response.ocid);
      console.log(`ocid : ${response.ocid}`);
    });
  }, [nickname]);

  return (
    <div>
      <InputBar handleSubmit={handleSubmit}></InputBar>
      {ocid && <CharacterTable ocid={ocid} />}
    </div>
  );
}
