import PeriodSelectPanel from '../PeriodSelectPanel';
import ApiKeyInputPanel from '../ApiKeyInputPanel';
import AvatarPanel from '../AvatarPanel';
import ContentPanel from '../ContentPanel';

export default function Home() {
  return (
    <div className='flex flex-col h-full'>
      <section
        label='searchArea'
        className='flex bg-custom bg-fixed bg-cover w-full pb-5'
      >
        <div className='pt-10 pl-10 pr-10 min-w-[400px] sm:hidden block ml-10'>
          <AvatarPanel />
        </div>
        <div className='flex flex-col mt-10 sm:mt-5 w-full sm:flex-col-reverse sm:px-[15px]'>
          <div>
            <ApiKeyInputPanel />
          </div>
          <div className='sm:mb-20'>
            <PeriodSelectPanel />
          </div>
        </div>
      </section>
      <section
        label='contentArea'
        className='bg-n1 flex flex-col lg:min-h-[700px] w-full'
      >
        <div className='px-[80px] sm:px-[15px] py-[36.96px] w-full'>
          <ContentPanel />
        </div>
      </section>
    </div>
  );
}
