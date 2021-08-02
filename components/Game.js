import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';

import { useState } from 'react';

import styles from '../styles/Game.module.css';

export default function Game() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        className={`${styles.button} ${styles.powerbutton}`}
        variant="contained"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <StopIcon /> : <PlayArrowIcon />}
      </Button>
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
