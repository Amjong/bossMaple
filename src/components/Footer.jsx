export default function Footer() {
  return (
    <footer className='w-full bottom-0 bg-n2 flex flex-col justify-center gap-[10px] h-[100px]'>
      <p className='left-[50px] relative self-stretch font-bold text-white text-lg tracking-[0] leading-[normal]'>
        <span className='font-regular text-white text-lg tracking-[0]'>
          ⓒ 2024 danpungbyeol All rights reserved.
          <br />
        </span>
      </p>
      <p className='left-[50px]  relative self-stretch font-bold text-lg tracking-[0] leading-[normal]'>
        <span className='font-regular text-white text-lg tracking-[0]'>
          This site is not associated with NEXON Korea. Data sourced from NEXON
          OpenAPI.
          <br />
        </span>
      </p>
      <p className='left-[50px]  relative self-stretch font-regular text-lg tracking-[0] leading-[normal]'>
        <span className='font-regular text-white text-lg tracking-[0]'>
          Contact Us -{' '}
        </span>
        <span className='underline text-white text-lg'>
          danpungtokki@gmail.com
        </span>
      </p>
    </footer>
  );
}
