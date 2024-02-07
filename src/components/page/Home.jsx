import PeriodSelectPanel from '../PeriodSelectPanel';
import ApiKeyInputPanel from '../ApiKeyInputPanel';
import AvatarPanel from '../AvatarPanel';
import ContentPanel from '../ContentPanel';
import UpBtn from '../ui/UpBtn';
import { useEffect, useState } from 'react';

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
    <div className='flex flex-col h-full'>
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
        className='overflow-auto bg-n1 flex flex-col lg:min-h-[700px] w-full'
      >
        <div className='px-[80px] sm:pl-[5px] py-[36.96px] w-full'>
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
    </div>
  );
}
