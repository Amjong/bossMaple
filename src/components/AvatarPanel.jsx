import { useUserInfo } from '../context/userInfoContext';
import { defaultCharacterSrc } from '../data/image/encodedImage';
import MasterBadge from './ui/MasterBadge';

export default function AvatarPanel() {
  const [userInfo] = useUserInfo();
  return (
    <div className='relative flex flex-col items-center w-full h-full border-solid border-[1.5px] border-y4 rounded-[30px]'>
      <img
        src={
          userInfo.characterImage
            ? userInfo.characterImage
            : defaultCharacterSrc
        }
        alt='avatar'
        className={`absolute w-full h-full object-contain ${
          userInfo.characterImage ? 'scale-[0.6] bottom-5' : 'bottom-10'
        }`}
      />
      <div className='absolute flex gap-5 bottom-5'>
        <MasterBadge
          text={
            userInfo.characterLevel
              ? `Lv. ${userInfo.characterLevel}`
              : 'Lv. 300'
          }
        />
        <MasterBadge
          text={userInfo.characterName ? `${userInfo.characterName}` : '단풍별'}
        />
      </div>
    </div>
  );
}
