import GetAppIcon from '@mui/icons-material/GetApp';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';

import { useEffect, useRef, useState } from 'react';
import getGameSrc from '../util/getGameSrc';

import styles from '../styles/components/GameFrame.module.css';

export default function GameFrame(props) {
  const { mapPixels } = props;

  const screenRef = useRef();

  // get game source
  const gameSrc = getGameSrc(props);
  const [source, setSource] = useState(gameSrc);

  // downloads game as an html file
  function downloadGame() {
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(source)}`;
    link.click();
  }

  // focuses on screen
  function focus() {
    screenRef.current.focus();
  }

  // reset source when cleared
  useEffect(() => {
    if (source === null) {
      setSource(gameSrc);
      focus();
    }
  }, [source]);

  // focus frame on start
  useEffect(() => {
    focus();
  }, []);

  return (
    <div className={styles.container}>
      <iframe
        ref={screenRef}
        className={styles.screen}
        title="game"
        sandbox="allow-scripts"
        srcDoc={source}
        width={mapPixels}
        height={mapPixels}
        frameBorder="0"
      />
      <div className={styles.toolbar}>
        <Button
          className="circlebutton"
          variant="contained"
          onClick={() => setSource(null)}
        >
          <ReplayIcon />
        </Button>
        {
          props.download &&
          <Button
            className="circlebutton"
            variant="contained"
            onClick={downloadGame}
          >
            <GetAppIcon />
          </Button>
        }
      </div>
    </div>
  );
}
