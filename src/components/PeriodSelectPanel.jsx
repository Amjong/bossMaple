import { useCallback, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import RadioBtns from './ui/RadioBtns';

export default function PeriodSelectPanel() {
  const [isPeriod, setIsPeriod] = useState(false);
  const onSelect = useCallback((value) => {
    if (value === 'all') {
      setIsPeriod(false);
    } else if (value === 'partial') {
      setIsPeriod(true);
    } else {
      console.log('error');
    }
  }, []);
  return (
    <>
      <StarTextArea text='조회기간' className='!absolute !left-[2px] !top-0' />
      <div className='absolute w-[200px] h-[48px] top-[47px] left-2'>
        <RadioBtns onSelect={onSelect} />
      </div>
      {isPeriod && 'datePicker'}
    </>
  );
}
