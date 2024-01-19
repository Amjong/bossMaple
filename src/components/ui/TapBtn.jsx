export default function TapBtn({ handleClick, isSelected, text }) {
  const color = isSelected ? 'bg-n0' : 'bg-n1';
  const font = isSelected ? 'text-bold' : 'text-regular';
  return (
    <div
      className={`${color} ${font} rounded-[10px] w-[243px] h-[78px] onClick=${handleClick} text-center whitespace-nowrap`}
    >
      {text}
    </div>
  );
}
