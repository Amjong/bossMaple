import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PeriodSelectPanel from '../PeriodSelectPanel';
import ApiKeyInputPanel from '../ApiKeyInputPanel';
import AvatarPanel from '../AvatarPanel';
import ContentPanel from '../ContentPanel';
import { StarforceProvider } from '../../context/starforceInfoContext';
import { UserInfoProvider } from '../../context/userInfoContext';
import { LoadingProvider } from '../../context/loadingContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <StarforceProvider>
        <UserInfoProvider>
          <div className='flex flex-col h-full'>
            <LoadingProvider>
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
            </LoadingProvider>
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