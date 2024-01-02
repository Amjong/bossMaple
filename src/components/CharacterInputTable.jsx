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
      <div className='w-full h-full m-auto'>
        {value === 0 ? (
          <CharacterInputTableSolo />
        ) : (
          <CharacterInputTableParty />
        )}
      </div>
      {/* TODO : 보스 계급도 미리 화면 배치 해두고, 버튼 누르면 스크롤 이동을 통해 보여주기 */}
      <button>잡을 수 있는 보스는?</button>
    </div>
  );
}
