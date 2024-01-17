import { defaultCharacterSrc } from '../data/image/encodedImage';
import MasterBadge from './ui/MasterBadge';

export default function AvatarPanel() {
  return (
    <div className='relative flex flex-col items-center w-full h-full border-solid border-[1.5px] border-y4 rounded-[30px]'>
      <img
        src={defaultCharacterSrc}
        alt='avatar'
        className='absolute bottom-5'
        width='396px'
        height='396px'
      />
      <div className='absolute flex gap-5 bottom-5'>
        <MasterBadge text='$레벨$' />
        <MasterBadge text='$닉네임$' />
      </div>
    </div>
  );
}
