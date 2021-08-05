import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';

import { useEffect, useState } from 'react';

import styles from '../styles/Game.module.css';

const keys = {};

export default function Game() {
  const [playing, setPlaying] = useState(false);

  // on start
  useEffect(() => {
    // set up key listeners
    window.onkeydown = e => {
      const keyCode = e.keyCode;
      if (!keys[keyCode]) {
        keys[keyCode] = true;
        if (keyCode === 37) console.log('left');
        else if (keyCode === 38) console.log('up');
        else if (keyCode === 39) console.log('right');
        else if (keyCode === 40) console.log('down');
        else if (keyCode === 65) console.log('a');
        else if (keyCode === 66) console.log('b');
      }
    }
    window.onkeyup = e => keys[e.keyCode] = false;
  }, []);

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
