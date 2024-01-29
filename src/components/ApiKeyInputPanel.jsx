import React, { useCallback, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import { MasterPrimaryButton } from './ui/MasterPrimaryButton';
import { useStarforceInfoArray } from '../context/starforceInfoContext';
import { useUserInfo } from '../context/userInfoContext';
import {
  getRepresentativeCharacter,
  getStarForceInfoByDate,
} from '../util/starforceUtility';
import { useLoading } from '../context/loadingContext';
import { useContentError } from '../context/contentErrorContext';

export default function ApiKeyInputPanel() {
  const [text, setText] = useState(localStorage.getItem('apiKey') || '');
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const [userInfo, setUserInfo] = useUserInfo();
  const [starforceInfoArray, setStarforceInfoArray] = useStarforceInfoArray();
  const [isLoading, setIsLoading] = useLoading();
  const [errorText, setErrorText] = useContentError();
  const onClickSubmit = useCallback(
    async (value) => {
      if (value === undefined || value === '') {
        alert('API Key 값을 입력해주세요!');
        return;
      }
      localStorage.setItem('apiKey', value);
      setIsLoading(true);
      setErrorText('');
      let receivedArray = [];
      try {
        receivedArray = await getStarForceInfoByDate(
          value,
          userInfo.startDate,
          userInfo.endDate
        );
      } catch (error) {
        if (error.message === '429') {
          setErrorText(
            '하루 검색 제한량이 초과되었습니다. API KEY 타입을 서비스 단계로 등록하고 다시 시도해주세요.'
          );
          setIsLoading(false);
          return;
        } else if (error.message === '400' || error.message === '403') {
          setErrorText('API KEY 값이 올바른지 확인 후 다시 시도해주세요.');
          setIsLoading(false);
          return;
        } else if (error.message === '500') {
          setErrorText(
            'Nexon API 서버에 오류가 발생했습니다. 나중에 다시 시도해주세요.'
          );
          setIsLoading(false);
          return;
        }
      }

      if (receivedArray.length === 0) {
        setErrorText(
          '2023-12-27 부터의 데이터만 조회할 수 있습니다. 설정하신 기간에 데이터가 존재하지 않습니다. 기간을 다시 설정해주세요.'
        );
        setIsLoading(false);
        return;
      }

      try {
        const characterInfo = await getRepresentativeCharacter(receivedArray);
        setUserInfo((prev) => ({
          ...prev,
          characterName: characterInfo.characterName,
          characterLevel: characterInfo.characterLevel,
          characterImage: characterInfo.characterImage,
        }));
      } catch (error) {
        console.log(error);
        // do nothing
      }

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
