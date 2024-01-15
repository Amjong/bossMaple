import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { logoSrc } from './data/image/encodedImage';
import ImageIcon from '@mui/icons-material/Image';
import MasterBadge from './components/ui/MasterBadge';
import PeriodSelectPanel from './components/PeriodSelectPanel';
import ApiKeyInputPanel from './components/ApiKeyInputPanel';

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
          className={`fixed bg-custom bg-cover w-full h-[374px] translate-y-[50px] translate-x-[0px] bg-[#1a202c]`}
        >
          <div className='absolute w-[299px] h-[297px] top-[39px] left-[100px]'>
            <div className='absolute w-[299px] h-[232px] top-0 left-0 bg-n2 rounded-[10px]'>
              <ImageIcon className='absolute !w-[77px] !h-[66px] !top-[94px] !left-[113px]' />
            </div>
            <div className='absolute bottom-0 flex gap-5 translate-x-7'>
              <MasterBadge
                className='!absolute !left-[128px] top-[264px]'
                divClassName='!left-[31px]'
                text='$레벨$'
              />
              <MasterBadge
                className='!absolute !left-0 !top-[264px]'
                text='$닉네임$'
              />
            </div>
          </div>
          <div className='absolute w-[209px] h-[95px] top-[200px] left-[503px]'>
            <PeriodSelectPanel />
          </div>
          <div className='absolute w-[861px] h-[117px] top-[39px] left-[503px]'>
            <ApiKeyInputPanel />
          </div>
        </section>
        <footer className='fixed w-full h-[226px] bottom-0 bg-n2'>
          <div className='flex flex-col items-start gap-[19px] relative w-full h-[138px] top-[44px] left-[76px]'>
            <p className='relative self-stretch font-bold text-white text-xl tracking-[0] leading-[normal]'>
              <span className='font-bold text-white text-lg tracking-[0]'>
                ⓒ 2024 danpungbyeol All rights reserved.
                <br />
              </span>
            </p>
            <p className='relative self-stretch font-bold text-xl tracking-[0] leading-[normal]'>
              <span className='font-bold text-white text-lg tracking-[0]'>
                This site is not associated with NEXON Korea. Data sourced from
                NEXON OpenAPI.
                <br />
              </span>
            </p>
            <p className='relative self-stretch font-bold text-xl tracking-[0] leading-[normal]'>
              <span className='font-bold text-white text-lg tracking-[0]'>
                Contact Us -{' '}
              </span>
              <span className='underline text-white text-lg'>
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
