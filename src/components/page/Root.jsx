import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { StarforceProvider } from '../../context/starforceInfoContext';
import { UserInfoProvider } from '../../context/userInfoContext';
import { LoadingProvider } from '../../context/loadingContext';
import { ContentErrorProvider } from '../../context/contentErrorContext';
import UpBtn from '../ui/UpBtn';
import { useEffect, useState } from 'react';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

export default function Root() {
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
    <div className='leading-loose overflow-hidden'>
      <StarforceProvider>
        <UserInfoProvider>
          <LoadingProvider>
            <ContentErrorProvider>
              <Navbar />
              <Outlet />
              <Footer />
            </ContentErrorProvider>
          </LoadingProvider>
        </UserInfoProvider>
      </StarforceProvider>
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
