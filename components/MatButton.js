import Tooltip from './Tooltip';

import styles from '../styles/components/MatButton.module.css';

export default function MatButton(props) {
  const { Icon, tooltip, onClick, className } = props;

  return (
    tooltip ?
    <Tooltip title={tooltip}>
    </Tooltip> :
  );
}
