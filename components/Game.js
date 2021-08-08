import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';

import { useEffect, useState } from 'react';

import styles from '../styles/Game.module.css';

const keys = {};

const buttonProps = {
  className: styles.button,
  variant: 'contained'
};

export default function Game() {
  const [playing, setPlaying] = useState(false);

  function input(key) {
    console.log(key);
  }

  // on start
  useEffect(() => {
    // set up key listeners
    window.onkeydown = e => {
      const keyCode = e.keyCode;
      if (!keys[keyCode]) {
        keys[keyCode] = true;
        if (keyCode === 37) input('left');
        else if (keyCode === 38) input('up');
        else if (keyCode === 39) input('right');
        else if (keyCode === 40) input('down');
        else if (keyCode === 65) input('a');
        else if (keyCode === 66) input('b');
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
          <Button onClick={() => input('up')} { ...buttonProps }>▲</Button>
          <div>
            <Button onClick={() => input('left')} { ...buttonProps }>◀</Button>
            <div style={{ display: 'inline-block', width: '32px' }} />
            <Button onClick={() => input('right')} { ...buttonProps }>▶</Button>
          </div>
          <Button onClick={() => input('down')} { ...buttonProps }>▼</Button>
        </div>
        <div style={{ display: 'inline-block', width: '32px' }} />
        <div className={styles.buttons}>
          <Button onClick={() => input('a')} { ...buttonProps }>A</Button>
          <div style={{ display: 'inline-block', width: '8px' }} />
          <Button onClick={() => input('b')} { ...buttonProps }>B</Button>
        </div>
      </div>
    </div>
  );
}
