import { Link } from 'react-router-dom';
import { logoSrc } from '../data/image/encodedImage';
import { useState } from 'react';

export default function Navbar() {
  const [menu, setMenu] = useState(0);
  return (
    <header className='flex w-full bg-n1 items-center z-10'>
      <div className='ml-10'>
        <Link to='/'>
          <img src={logoSrc} alt='logo' className='w-[126px] h-4/5' />
        </Link>
      </div>
      <div className='flex w-full items-center justify-end gap-[36px] pl-[25px] pr-0 py-0 relative translate-x-[-50px]'>
        <div className='inline-flex items-center justify-end gap-[33px] relative flex-[0_0_auto]'>
          <div
            className={`font-regular ${
              menu === 0 ? 'text-y4 font-extrabold ' : 'text-white font-medium '
            } relative w-fit mt-[-1.00px] text-center tracking-[0] leading-[normal] whitespace-nowrap`}
          >
            <Link
              to='/'
              className='underline underline-offset-4'
              onClick={() => setMenu(0)}
            >
              스타포스
            </Link>
          </div>
          <div
            className={`font-regular ${
              menu === 1 ? 'text-y4 font-extrabold ' : 'text-white font-medium '
            }relative w-fit mt-[-1.00px] text-center tracking-[0] leading-[normal] whitespace-nowrap`}
          >
            <Link
              to='/guide'
              className='underline underline-offset-4'
              onClick={() => setMenu(1)}
            >
              서비스가이드
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
