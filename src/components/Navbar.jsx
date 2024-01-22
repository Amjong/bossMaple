import { logoSrc } from '../data/image/encodedImage';

export default function Navbar() {
  return (
    <header className='fixed flex w-full basis-[5.5%] bg-n1 items-center z-10'>
      <img
        src={logoSrc}
        alt='logo'
        className='w-[126px] h-4/5 translate-x-[50px]'
      />
      <div className='flex w-full items-center justify-end gap-[36px] pl-[25px] pr-0 py-0 relative translate-x-[-50px]'>
        <div className='inline-flex items-center justify-end gap-[33px] relative flex-[0_0_auto]'>
          <div className='font-regular font-extrabold text-y4 text-xl relative w-fit mt-[-1.00px] text-center tracking-[0] leading-[normal] whitespace-nowrap'>
            스타포스
            {/* TODO : Add btn */}
          </div>
          <div className='font-regular font-light text-white relative w-fit mt-[-1.00px] text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap'>
            서비스가이드
            {/* TODO : Add btn */}
          </div>
        </div>
      </div>
    </header>
  );
}
