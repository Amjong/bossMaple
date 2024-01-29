import { Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function MasterToolTip({ text, placement }) {
  return (
    <div className='hover:cursor-pointer'>
      <Tooltip title={text} placement={placement}>
        <InfoOutlinedIcon fontSize='large' sx={{ color: '#FFE380' }} />
      </Tooltip>
    </div>
  );
}
