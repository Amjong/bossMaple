import { useState } from 'react';
import TapBtn from './TapBtn';
export default function TapBtns({ onChanged, tabBtnsArray }) {
  const [selectedValue, setSelectedValue] = useState(0);
  return (
    <div className='w-full flex justify-start gap-3'>
      {tabBtnsArray?.map(({ text }, index) => {
        return (
          <TapBtn
            handleClick={() => {
              setSelectedValue(index);
              onChanged(index);
            }}
            isSelected={selectedValue === index}
            text={text}
          />
        );
      })}
    </div>
  );
}
