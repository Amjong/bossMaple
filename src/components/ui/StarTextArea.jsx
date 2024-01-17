import React from 'react';
import { starSrc } from '../../data/image/encodedImage';

export default function StarTextArea({ text }) {
  return (
    <div className='relative w-[175px] h-[44px]'>
      <div className='absolute h-[28px] top-[7px] left-[50px] font-bold whitespace-nowrap leading-[normal] tracking-[0] text-xl text-y4'>
        {text}
      </div>
      <img className='w-[45px] h-[44px]' alt='img' src={starSrc} />
    </div>
  );
}
