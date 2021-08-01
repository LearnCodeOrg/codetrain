import Button from '@material-ui/core/Button';

import styles from '../styles/Game.module.css';

export default function Game() {
  return (
    <div className={styles.container}>
      <canvas
        className={styles.screen}
        width={256}
        height={256}
      />
      <Button className={styles.button} variant="contained">▲</Button>
      <Button className={styles.button} variant="contained">▼</Button>
      <Button className={styles.button} variant="contained">▶</Button>
      <Button className={styles.button} variant="contained">◀</Button>
      <Button className={styles.button} variant="contained">A</Button>
      <Button className={styles.button} variant="contained">B</Button>
    </div>
  );
}
