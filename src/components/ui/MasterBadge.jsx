export default function MasterBadge({ text }) {
  return (
    <div className='relative w-[112px] h-[33px] bg-y4 rounded-[10px]'>
      <div
        className={`absolute top-[7px] left-[23px] font-regular text-center tracking-[0] leading-[normal] whitespace-nowrap`}
      >
        {text}
      </div>
    </div>
  );
}
