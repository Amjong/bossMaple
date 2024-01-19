import { useState } from 'react';
import UsedMesoPanel from './UsedMesoPanel';
import SuccessRatePanel from './SuccessRatePanel';
import HistoryPanel from './HistoryPanel';
import TapBtns from './ui/TapBtns';

const contentArray = [
  {
    component: <UsedMesoPanel />,
  },
  {
    component: <SuccessRatePanel />,
  },
  {
    component: <HistoryPanel />,
  },
];

export default function ContentPanel() {
  const [menu, setMenu] = useState(0);
  const handleChange = (value) => {
    setMenu(value);
  };
  return (
    <div className='w-full'>
      <TapBtns onChanged={handleChange} />
      {contentArray[menu].component}
    </div>
  );
}
