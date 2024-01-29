import { useContentError } from '../context/contentErrorContext';

export default function HistoryPanel() {
  const [errorText] = useContentError();
  return (
    <div>
      {errorText === '' && (
        <div className='font-bold text-white flex flex-col justify-center items-center mt-20'>
          히스토리 기능은 곧 업데이트 될 예정이에요. <br />
          조금만 기다려 주세요!
          <img
            src='https://res.cloudinary.com/dazzvmx3y/image/upload/v1706498801/veaatfs2qxgsucylub2k.png'
            alt='smile'
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
