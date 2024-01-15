export const MasterPrimaryButton = ({ text, onClick, color }) => {
  const buttonColor = color === 'r2' ? 'bg-r2' : 'bg-n2';
  /* TODO : buttonColor 를 동적으로 변경 가능하도록 수정 */
  return (
    <button
      className={`hover:shadow-lg gap-[8px] flex items-center relative px-[18px] py-[14px] rounded-[30px] ${buttonColor} text-white h-[46px] text-center`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
