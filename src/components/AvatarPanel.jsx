import { defaultCharacterSrc } from '../data/image/encodedImage';
import MasterBadge from './ui/MasterBadge';

export default function AvatarPanel() {
  return (
    <div className='relative flex flex-col items-center w-full h-full border-solid border-[1.5px] border-y4 rounded-[30px]'>
      <img
        src={defaultCharacterSrc}
        alt='avatar'
        className='absolute w-full h-full object-cover bottom-10'
      />
      <div className='absolute flex gap-5 bottom-5'>
        <MasterBadge text='Lv. 300' />
        <MasterBadge text='단풍별' />
      </div>
    </div>
  );
}
