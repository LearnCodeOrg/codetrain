import BaseModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import ClearIcon from '@mui/icons-material/Clear';

import styles from '../styles/components/Modal.module.css';

export default function Modal(props) {
  const { open, setOpen } = props;

  // called on modal close
  function onClose() {
    setOpen(false);
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        className: styles.backdrop,
        timeout: 100
      }}
    >
      <Fade in={open} timeout={100}>
        <div className={styles.modal}>
          <button className={styles.close} onClick={onClose}>
            <ClearIcon />
          </button>
          {props.children}
        </div>
      </Fade>
    </BaseModal>
  );
}
