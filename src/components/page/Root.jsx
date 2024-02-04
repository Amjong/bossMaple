import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Root() {
  return (
    <div className='leading-loose overflow-hidden'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
