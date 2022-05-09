import Tooltip from './Tooltip';

import styles from '../styles/components/MatButton.module.css';

export default function MatButton(props) {
  const { Icon, tooltip, onClick, className } = props;

  return (
    tooltip ?
    <Tooltip title={tooltip}>
      <button
        onClick={onClick}
        className={`${className} ${styles.button}`}
      >
        <Icon fontSize="large" />
      </button>
    </Tooltip> :
  );
}
