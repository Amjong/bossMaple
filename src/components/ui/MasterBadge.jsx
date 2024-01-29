export default function MasterBadge({ text }) {
  return (
    <div className='w-[112px] h-[33px] bg-y4 rounded-[10px]'>
      <div className='font-regular text-center whitespace-nowrap'>{text}</div>
    </div>
  );
}
