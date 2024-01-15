import { defaultCharacterSrc } from '../data/image/encodedImage';
import MasterBadge from './ui/MasterBadge';

export default function AvatarPanel() {
  return (
    <div className='absolute flex flex-col items-center w-[385px] h-[300px] top-0 left-0border-solid border-[1.5px] border-y4 rounded-[30px]'>
      <img
        src={defaultCharacterSrc}
        alt='avatar'
        className='fixed translate-y-[-150px] translate-x-[-5px]'
      />
      <div className='absolute bottom-5 flex gap-5'>
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
  );
}
