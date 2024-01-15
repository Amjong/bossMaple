import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { logoSrc } from './data/image/encodedImage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col'>
        <header className='fixed flex w-full h-[50px] bg-n1 items-center'>
          <img
            src={logoSrc}
            alt='logo'
            className='absolute w-[116px] h-[36px] translate-x-[50px]'
          />
          <div className='flex w-full items-center justify-end gap-[36px] pl-[25px] pr-0 py-0 relative translate-x-[-50px]'>
            <div className='inline-flex items-center justify-end gap-[33px] relative flex-[0_0_auto]'>
              <div className='font-regular text-y4 text-xl relative w-fit mt-[-1.00px] text-center tracking-[0] leading-[normal] whitespace-nowrap [font-style:normal]'>
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
        <section
          label='searchArea'
          className='fixed w-full h-[374px] translate-y-[50px] translate-x-[0px] bg-[#1a202c]'
        ></section>
        <footer className='fixed w-full h-[226px] bottom-0 bg-n2'>
          <div className='flex flex-col items-start gap-[27px] relative w-full h-[138px] top-[44px] left-[76px]'>
            <p className='relative self-stretch font-bold text-white text-xl tracking-[0] leading-[normal]'>
              <span className='font-bold text-white text-xl tracking-[0]'>
                ⓒ 2024 danpungbyeol All rights reserved.
                <br />
              </span>
            </p>
            <p className='relative self-stretch font-bold text-xl tracking-[0] leading-[normal]'>
              <span className='font-bold text-white text-xl tracking-[0]'>
                This site is not associated with NEXON Korea. Data sourced from
                NEXON OpenAPI.
                <br />
              </span>
            </p>
            <p className='relative self-stretch font-bold text-xl tracking-[0] leading-[normal]'>
              <span className='font-bold text-white text-xl tracking-[0]'>
                Contact Us -{' '}
              </span>
              <span className='underline text-white'>
                danpungtokki@gmail.com
              </span>
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
