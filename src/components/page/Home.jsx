import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PeriodSelectPanel from '../PeriodSelectPanel';
import ApiKeyInputPanel from '../ApiKeyInputPanel';
import AvatarPanel from '../AvatarPanel';
import ContentPanel from '../ContentPanel';
import { StarforceProvider } from '../../context/starforceInfoContext';
import { UserInfoProvider } from '../../context/userInfoContext';
import { LoadingProvider } from '../../context/loadingContext';
import UpBtn from '../ui/UpBtn';
import { useEffect, useState } from 'react';
import { ContentErrorProvider } from '../../context/contentErrorContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <StarforceProvider>
        <UserInfoProvider>
          <div className='flex flex-col h-full'>
            <LoadingProvider>
              <ContentErrorProvider>
                <section
                  label='searchArea'
                  className='flex bg-custom bg-fixed bg-cover w-full pb-5'
                >
                  <div className='pt-10 pl-10 pr-10 min-w-[400px] sm:hidden block ml-10'>
                    <AvatarPanel />
                  </div>
                  <div className='flex flex-col mt-10 w-full sm:flex-col-reverse'>
                    <div>
                      <ApiKeyInputPanel />
                    </div>
                    <div className='sm:mb-20'>
                      <PeriodSelectPanel />
                    </div>
                  </div>
                </section>
                <section
                  label='contentArea'
                  className='overflow-auto bg-n1 min-w-[1440px] flex flex-col'
                >
                  <div className='px-[80px] sm:px-[5px] py-[36.96px] h-[1500px] w-full'>
                    <ContentPanel />
                  </div>
                </section>
                {isVisible && (
                  <div
                    className='fixed bottom-[100px] right-[35px]'
                    onClick={scrollToTop}
                  >
                    <UpBtn />
                  </div>
                )}
              </ContentErrorProvider>
            </LoadingProvider>
          </div>
        </UserInfoProvider>
      </StarforceProvider>
    </QueryClientProvider>
  );
}
