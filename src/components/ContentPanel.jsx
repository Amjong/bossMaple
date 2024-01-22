import { useState } from 'react';
import UsedMesoPanel from './UsedMesoPanel';
import SuccessRatePanel from './SuccessRatePanel';
import HistoryPanel from './HistoryPanel';
import TapBtns from './ui/TapBtns';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { Link } from 'react-router-dom';

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
  const [starforceInfoArray] = useStarforceInfoArray();
  const handleChange = (value) => {
    setMenu(value);
  };
  return (
    <div className='w-full'>
      <TapBtns onChanged={handleChange} />
      <div className='mt-10'>
        {starforceInfoArray.length === 0 ? (
          <div className='text-[36px] font-bold text-center text-white mt-20 leading-loose'>
            API KEY 값을 입력 해주세요.
            <br />
            <Link
              to='/bossMaple/guide'
              className='text-r2 underline underline-offset-4'
            >
              API KEY 값 입력 가이드
            </Link>{' '}
            보러가기
          </div>
        ) : (
          contentArray[menu].component
        )}
      </div>
    </div>
  );
}
