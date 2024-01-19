import { useState } from 'react';
import TapBtn from './TapBtn';

const tabBtnsArray = [
  {
    text: '사용 메소량',
  },
  {
    text: '강화 단계별 성공률',
  },
  {
    text: '히스토리',
  },
];
export default function TapBtns({ onChanged }) {
  const [selectedValue, setSelectedValue] = useState(0);
  return (
    <div className='w-full flex justify-start gap-3'>
      {tabBtnsArray.map((tabBtn, index) => {
        return (
          <TapBtn
            handleClick={() => {
              setSelectedValue(index);
              onChanged(index);
            }}
            isSelected={selectedValue === index}
            text={tabBtn.text}
          />
        );
      })}
    </div>
  );
}
