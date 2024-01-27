import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function UpBtn() {
  return (
    <div className='w-[40px] h-[40px] rounded-full border-y4 border-2 bg-n2 flex justify-center items-center hover:cursor-pointer'>
      <KeyboardDoubleArrowUpIcon sx={{ color: '#FFE380', fontSize: '32px' }} />
    </div>
  );
}
