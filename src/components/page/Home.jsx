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
                className='flex bg-custom bg-fixed bg-cover w-full pb-5'
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
                className='overflow-y-auto bg-n1 h-full w-full flex flex-col '
              >
                <div className='px-[80px] py-[36.96px] h-[1500px] w-full'>
                  <ContentPanel />
                </div>
              </section>
            </LoadingProvider>
          </div>
        </UserInfoProvider>
      </StarforceProvider>
    </QueryClientProvider>
  );
}
