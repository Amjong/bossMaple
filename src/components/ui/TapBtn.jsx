export default function TapBtn({ handleClick, isSelected, text }) {
  const color = isSelected ? 'bg-n0' : 'bg-n2';
  const font = isSelected ? 'font-bold' : 'font-regular';
  return (
    <div
      className={`${color} ${font} flex items-center justify-center text-y4 rounded-[10px] w-[243px] h-[78px] sm:w-[162px] sm:h-[52px] sm:text-[18px] text-center whitespace-nowrap cursor-pointer text-xl pt-1`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
