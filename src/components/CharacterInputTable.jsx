import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BoyIcon from '@mui/icons-material/Boy';
import GroupsIcon from '@mui/icons-material/Groups';
import { useState } from 'react';
import CharacterInputTableSolo from './CharacterInputTableSolo';
import CharacterInputTableParty from './CharacterInputTableParty';

export default function CharacterInputTable() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='icon tabs example'
        sx={{
          width: '100%',
        }}
      >
        <Tab icon={<BoyIcon />} label='1인' sx={{ width: '50%' }} />
        <Tab icon={<GroupsIcon />} label='파티' sx={{ width: '50%' }} />
      </Tabs>
      <div className='flex w-full h-full items-center justify-center border-solid border-5 border-black'>
        {value === 0 ? (
          <CharacterInputTableSolo />
        ) : (
          <CharacterInputTableParty />
        )}
      </div>
    </div>
  );
}
