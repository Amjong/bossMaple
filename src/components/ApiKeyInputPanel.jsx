import React, { useCallback, useState } from 'react';
import StarTextArea from './ui/StarTextArea';
import { MasterPrimaryButton } from './ui/MasterPrimaryButton';

export default function ApiKeyInputPanel() {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const onClickSubmit = useCallback(() => {}, []);
  const onClickReset = useCallback(() => {}, []);
  return (
    <div>
      <StarTextArea text='API KEY 값' />
      <div className='flex gap-2 items-center mt-3'>
        <input
          placeholder='API KEY 값을 입력해주세요'
          value={text}
          onChange={handleChange}
          type='password'
          className='w-[580px] h-[46px] bg-white rounded-[30px] focus:outline-n1 text-center'
        />
        <MasterPrimaryButton text='조회' onClick={onClickSubmit} color='r2' />
        <MasterPrimaryButton text='초기화' onClick={onClickReset} color='n2' />
      </div>
    </div>
  );
}
