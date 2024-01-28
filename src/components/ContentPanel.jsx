import { useState } from 'react';
import UsedMesoPanel from './UsedMesoPanel';
import SuccessRatePanel from './SuccessRatePanel';
import HistoryPanel from './HistoryPanel';
import TapBtns from './ui/TapBtns';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { Link } from 'react-router-dom';
import { useLoading } from '../context/loadingContext';

const contentArray = [
  {
    text: '사용 메소량',
    component: <UsedMesoPanel />,
  },
  {
    text: '강화 단계 별 성공률',
    component: <SuccessRatePanel />,
  },
  {
    text: '히스토리',
    component: <HistoryPanel />,
  },
];

export default function ContentPanel() {
  const [menu, setMenu] = useState(0);
  const [starforceInfoArray] = useStarforceInfoArray();
  const [isLoading] = useLoading();
  const handleChange = (value) => {
    setMenu(value);
  };
  return (
    <div className='w-full'>
      <TapBtns onChanged={handleChange} tabBtnsArray={contentArray} />
      <div className='mt-10'>
        {!isLoading && starforceInfoArray.length === 0 ? (
          <div className='text-[36px] font-bold text-center text-white mt-20 leading-loose'>
            API KEY 값을 입력 해주세요.
            <br />
            <Link to='/guide' className='text-r2 underline underline-offset-4'>
              API KEY 값 입력 가이드
            </Link>{' '}
            보러가기 <br />
            (약 1 ~ 2분 소요)
          </div>
        ) : (
          contentArray[menu].component
        )}
      </div>
    </div>
  );
}
