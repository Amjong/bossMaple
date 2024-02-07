import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { StarforceProvider } from '../../context/starforceInfoContext';
import { UserInfoProvider } from '../../context/userInfoContext';
import { LoadingProvider } from '../../context/loadingContext';
import { ContentErrorProvider } from '../../context/contentErrorContext';

export default function Root() {
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
    </div>
  );
}
