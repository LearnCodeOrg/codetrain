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
      <div className={styles.controls}>
        <div className={styles.arrows}>
          <Button className={styles.button} variant="contained">▲</Button>
          <div>
            <Button className={styles.button} variant="contained">◀</Button>
            <div style={{ display: 'inline-block', width: '32px' }} />
            <Button className={styles.button} variant="contained">▶</Button>
          </div>
          <Button className={styles.button} variant="contained">▼</Button>
        </div>
        <div style={{ display: 'inline-block', width: '32px' }} />
        <div className={styles.buttons}>
          <Button className={styles.button} variant="contained">A</Button>
          <div style={{ display: 'inline-block', width: '8px' }} />
          <Button className={styles.button} variant="contained">B</Button>
        </div>
      </div>
    </div>
  );
}
