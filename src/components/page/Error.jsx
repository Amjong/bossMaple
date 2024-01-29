import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { MasterPrimaryButton } from '../ui/MasterPrimaryButton';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='bg-n1 h-screen flex flex-col justify-center items-center'>
      <img
        src='https://res.cloudinary.com/dazzvmx3y/image/upload/w_400,h_400,c_fill/v1706498803/hfluln11b0770ppq7k4o.png'
        alt='sad'
        width={300}
        height={300}
      />
      <div className='font-bold text-xl text-y4'>
        죄송합니다. 페이지를 찾을 수 없습니다.
      </div>
      <div className='ml-10 mt-5 mb-20 text-white'>
        <span className='font-bold'>
          개발자 메일
          <br />
        </span>
        <span className='font-regular text-[12px]'>
          서비스 관련 궁금증, 건의사항이 생기면 언제든지 연락해주세요! <br />
          <br />
        </span>
        <MailOutlineIcon />{' '}
        <span className='underline text-lg leading-loose'>
          danpungtokki@gmail.com
        </span>
      </div>
      <Link to='/'>
        <MasterPrimaryButton text='홈으로 가기' color='r2' />
      </Link>
    </div>
  );
}
