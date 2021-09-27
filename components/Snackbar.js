import BaseSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Snackbar(props) {
  const { type, message, open, setOpen } = props;

  // on snackbar closed
  function onClose(event, reason) {
    if (reason !== 'clickaway') setOpen(false);
  }

  return (
    <BaseSnackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={onClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={type}
      >
        {message}
      </MuiAlert>
    </BaseSnackbar>
  );
}
