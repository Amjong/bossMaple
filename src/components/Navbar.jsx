import { Link } from 'react-router-dom';
import { logoSrc } from '../data/image/encodedImage';
import { useState } from 'react';

export default function Navbar() {
  const [menu, setMenu] = useState(0);
  return (
    <header className='flex sm:flex-col w-full bg-n1 items-center sm:items-start z-10 h-[45px] sm:h-[120px]'>
      <div className='ml-10 sm:m-4'>
        <Link to='/'>
          <img src={logoSrc} alt='logo' className='w-[126px] h-4/5 sm:h-full' />
        </Link>
      </div>
      <div className='flex w-full items-center justify-end sm:justify-start gap-[36px] pl-[25px] pr-0 py-0 relative translate-x-[-50px] sm:translate-x-[0px]'>
        <div
          className={`font-regular ${
            menu === 0 ? 'text-y4 font-extrabold ' : 'text-white font-medium '
          } relative w-fit mt-[-1.00px] text-center tracking-[0] leading-[normal] whitespace-nowrap`}
        >
          <Link
            to='/'
            className='underline underline-offset-4 text-xl'
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
            className='underline underline-offset-4 text-xl'
            onClick={() => setMenu(1)}
          >
            서비스가이드
          </Link>
        </div>
      </div>
    </header>
  );
}
