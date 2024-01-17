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
    <div>
      <StarTextArea text='조회기간' />
      <div className='flex flex-col translate-x-[11px] mt-5 sm:flex-row flex-wrap'>
        <div className='min-x-[182px]'>
          <RadioBtns onSelect={onSelect} />
        </div>
        {isPeriod && (
          <div className='flex gap-5'>
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
              minDate={new Date(startDate)}
              maxDate={new Date(startDate).setFullYear(
                startDate.getFullYear() + 1
              )}
              placeholderText='종료일'
            />
          </div>
        )}
      </div>
    </div>
  );
}
