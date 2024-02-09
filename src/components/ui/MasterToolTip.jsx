import { ClickAwayListener, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';

export default function MasterToolTip({ text, placement }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div className='hidden sm:block'>
          <Tooltip
            title={text}
            placement='bottom'
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <div>
              <button onClick={handleTooltipOpen} className='w-[24px] h-[24px]'>
                <InfoOutlinedIcon fontSize='medium' sx={{ color: '#FFE380' }} />
              </button>
            </div>
          </Tooltip>
        </div>
      </ClickAwayListener>
      <div className='hover:cursor-pointer sm:hidden'>
        <Tooltip title={text} placement={placement}>
          <InfoOutlinedIcon fontSize='medium' sx={{ color: '#FFE380' }} />
        </Tooltip>
      </div>
    </div>
  );
}
