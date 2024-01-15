import { useCallback, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import RadioBtns from './ui/RadioBtns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PeriodSelectPanel() {
  const [isPeriod, setIsPeriod] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onSelect = useCallback((value) => {
    if (value === 'all') {
      setIsPeriod(false);
    } else if (value === 'partial') {
      setIsPeriod(true);
    } else {
      console.log('error');
    }
  }, []);

  const onChangeEnd = useCallback(
    (date) => {
      if (date < startDate) {
        alert('시작일보다 빠를 수 없습니다.');
        return;
      }
      setEndDate(date);
    },
    [startDate]
  );

  return (
    <>
      <StarTextArea text='조회기간' className='!absolute !left-[2px] !top-0' />
      <div className='absolute w-[200px] h-[48px] top-[47px] left-2'>
        <RadioBtns onSelect={onSelect} />
      </div>
      {isPeriod && (
        <div className='absolute flex gap-4 left-[202px] mt-1'>
          <ReactDatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date('2023-12-27')}
            placeholderText='시작일'
          />
          <ReactDatePicker
            showIcon
            selected={endDate}
            onChange={onChangeEnd}
            minDate={new Date('2023-12-27')}
            maxDate={new Date(startDate).setFullYear(
              startDate.getFullYear() + 1
            )}
            placeholderText='종료일'
          />
        </div>
      )}
    </>
  );
}
