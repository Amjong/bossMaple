import { useCallback, useEffect, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import RadioBtns from './ui/RadioBtns';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserInfo } from '../context/userInfoContext';
import MyCalendar from './MyCalendar';
import MasterToolTip from './ui/MasterToolTip';

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
      <div className='flex gap-1'>
        <StarTextArea text='조회기간' />
        <div className='mt-1'>
          <MasterToolTip
            text='2023-12-27 이후의 데이터만 조회 가능합니다'
            placement='right-end'
          />
        </div>
      </div>
      <div className='flex flex-row translate-x-[11px] mt-5 sm:flex-col flex-wrap'>
        <div className='min-x-[182px]'>
          <RadioBtns onSelect={onSelect} />
        </div>
        {isPeriod && (
          <div className='flex gap-5'>
            <div className='sm:w-1/2'>
              <MyCalendar
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
            </div>
            <div className='sm:w-1/2'>
              <MyCalendar
                selected={endDate}
                onChange={onChangeEnd}
                minDate={new Date('2023-12-27')}
                maxDate={new Date(startDate).setFullYear(
                  startDate.getFullYear() + 1
                )}
                placeholderText='종료일'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
