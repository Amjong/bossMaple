import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { logoSrc } from './data/image/encodedImage';
import PeriodSelectPanel from './components/PeriodSelectPanel';
import ApiKeyInputPanel from './components/ApiKeyInputPanel';
import AvatarPanel from './components/AvatarPanel';
import ContentPanel from './components/ContentPanel';
import { StarforceProvider } from './context/starforceInfoContext';
import { UserInfoProvider } from './context/userInfoContext';

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
      <StarforceProvider>
        <UserInfoProvider>
          <div className='flex flex-col h-full'>
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
            <section
              label='searchArea'
              className='flex bg-custom bg-fixed bg-cover w-full basis-[15.4%] z-0'
            >
              <div className='p-10 min-w-[400px] sm:block hidden ml-10'>
                <AvatarPanel />
              </div>
              <div className='flex flex-col mt-10 w-full'>
                <ApiKeyInputPanel />
                <PeriodSelectPanel />
              </div>
            </section>
            <section
              label='contentArea'
              className='overflow-y-auto bg-n1 h-full w-full flex flex-col basis-[69.8%]'
            >
              <div className='px-[80px] py-[36.96px] h-[1500px] w-full'>
                <ContentPanel />
              </div>
            </section>
            <footer className='w-full basis-[9.3%] bottom-0 bg-n2 flex flex-col justify-center gap-[10px]'>
              <p className='left-[50px] relative self-stretch font-bold text-white text-lg tracking-[0] leading-[normal]'>
                <span className='font-regular text-white text-lg tracking-[0]'>
                  ⓒ 2024 danpungbyeol All rights reserved.
                  <br />
                </span>
              </p>
              <p className='left-[50px]  relative self-stretch font-bold text-lg tracking-[0] leading-[normal]'>
                <span className='font-regular text-white text-lg tracking-[0]'>
                  This site is not associated with NEXON Korea. Data sourced
                  from NEXON OpenAPI.
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
          </div>
        </UserInfoProvider>
      </StarforceProvider>
    </QueryClientProvider>
  );
}

export default App;
