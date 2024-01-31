import { Snackbar } from '@mui/material';

export default function MasterSnackBar({ open, onClose, message }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={onClose}
        message={message}
        autoHideDuration={1200}
      />
    </div>
  );
}
