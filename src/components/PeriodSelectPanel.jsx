import { useCallback, useEffect, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import RadioBtns from './ui/RadioBtns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserInfo } from '../context/userInfoContext';

export default function PeriodSelectPanel() {
  const [isPeriod, setIsPeriod] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userInfo, setUserInfo] = useUserInfo();
  const onSelect = useCallback(
    (value) => {
      if (value === 'all') {
        setIsPeriod(false);
        setUserInfo((prev) => ({
          ...prev,
          startDate: '2023-12-27',
          endDate: new Date().toISOString().slice(0, 10),
        }));
      } else if (value === 'partial') {
        setIsPeriod(true);
        setUserInfo((prev) => ({
          ...prev,
          startDate: new Date(startDate).toISOString().slice(0, 10),
          endDate: new Date(endDate).toISOString().slice(0, 10),
        }));
      } else {
        console.log('error');
      }
    },
    [setUserInfo]
  );

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      startDate: '2023-12-27',
      endDate: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  const onChangeEnd = useCallback(
    (date) => {
      if (date < startDate) {
        setStartDate(date);
        setUserInfo((prev) => ({
          ...prev,
          startDate: date.toISOString().slice(0, 10),
        }));
      }
      console.log(date);
      setEndDate(date);
      setUserInfo((prev) => ({
        ...prev,
        endDate: date.toISOString().slice(0, 10),
      }));
    },
    [startDate, setUserInfo]
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
              onChange={(date) => {
                setStartDate(date);
                setUserInfo((prev) => ({
                  ...prev,
                  startDate: date.toISOString().slice(0, 10),
                }));
              }}
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
      </div>
    </div>
  );
}
