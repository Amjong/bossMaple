import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getOcidFromNickname } from '../util/openApiManager';
import InputBar from './InputBar';

export default function CharacterInputTableSolo() {
  const [nickname, setNickname] = useState('');
  const [ocid, setOcid] = useState('');
  const [isInputBarDisplay, setIsInputBarDisplay] = useState(false);
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
    <div className='flex w-2/5 h-4/5 text-center items-center justify-center border-4 border-red-900 my-10 m-auto rounded-xl'>
      {!isInputBarDisplay && (
        <IconButton
          className='hover:scale-150'
          onClick={() => {
            setIsInputBarDisplay(true);
          }}
        >
          <AddIcon />
        </IconButton>
      )}

      {/* TODO : InputBar -> modal popup */}
      {isInputBarDisplay && <InputBar handleSubmit={handleSubmit}></InputBar>}
      {ocid && <p>{ocid}</p>}
    </div>
  );
}
