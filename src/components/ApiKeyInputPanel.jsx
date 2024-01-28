import React, { useCallback, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import { MasterPrimaryButton } from './ui/MasterPrimaryButton';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { useUserInfo } from '../context/userInfoContext';
import { getStarForceInfoByDate } from '../util/starforceUtility';
import { useLoading } from '../context/loadingContext';

export default function ApiKeyInputPanel() {
  const [text, setText] = useState(localStorage.getItem('apiKey') || '');
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const [userInfo, setUserInfo] = useUserInfo();
  const [starforceInfoArray, setStarforceInfoArray] = useStarforceInfoArray();
  const [isLoading, setIsLoading] = useLoading();
  const onClickSubmit = useCallback(
    async (value) => {
      if (value === undefined || value === '') {
        alert('API Key 값을 입력해주세요!');
        return;
      }

      localStorage.setItem('apiKey', value);
      /* TODO 2) fetching starforce info */
      setIsLoading(true);
      const receivedArray = await getStarForceInfoByDate(
        value,
        userInfo.startDate,
        userInfo.endDate
      );
      console.log(receivedArray);
      setStarforceInfoArray(() => {
        return Array.from(receivedArray);
      });
      setIsLoading(false);
      setUserInfo((prev) => ({
        ...prev,
        finalStartDate: userInfo.startDate,
        finalEndDate: userInfo.endDate,
      }));
    },
    [userInfo]
  );
  const onClickReset = useCallback(() => {
    setText('');
    localStorage.removeItem('apiKey');
  }, []);
  return (
    <div className='mb-10 w-full'>
      <StarTextArea text='API KEY 값' />
      <div className='flex flex-col sm:flex-row gap-2 items-center mt-3 w-full shrink'>
        <input
          placeholder='API KEY 값을 입력해주세요'
          value={text}
          onChange={handleChange}
          type='password'
          className='xl:w-3/5 w-4/5 min-w-[400px] h-[46px] max-w-[1000px] bg-white rounded-[30px] focus:outline-n1 text-center'
        />
        <MasterPrimaryButton
          text='조회'
          onClick={() => onClickSubmit(text)}
          color='r2'
        />
        <MasterPrimaryButton text='초기화' onClick={onClickReset} color='n2' />
      </div>
    </div>
  );
}
