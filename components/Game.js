import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/Game.module.css';

const keys = {};

const buttonProps = {
  className: styles.button,
  variant: 'contained'
};

const mapPixels = 256;
const mapSize = 16;
const spritePixels = Math.floor(mapPixels / mapSize);

let canvas, ctx;
let sketching = false;

export default function Game(props) {
  const { sprites, colors, spriteSize, currSprite } = props;
  const pixelPixels = Math.floor(spritePixels / spriteSize);

  const [playing, setPlaying] = useState(false);
  const [map, setMap] = useState(Array(mapSize * mapSize).fill(0));

  const canvasRef = useRef();

  function input(key) {
    console.log(key);
  }

  // draws game canvas
  function draw() {
    if (!sprites || !colors) return;
    // for each tile
    for (let y = 0; y < mapSize; y++) {
      for (let x = 0; x < mapSize; x++) {
        // get tile
        const spriteIndex = y * mapSize + x;
        const sprite = sprites[map[spriteIndex]];
        // for each pixel
        for (let yp = 0; yp < spriteSize; yp++) {
          for (let xp = 0; xp < spriteSize; xp++) {
            // set fill color
            const colorIndex = yp * spriteSize + xp;
            const color = colors[sprite[colorIndex]];
            ctx.fillStyle = color;
            // get fill position
            let xm = x * spritePixels + xp * pixelPixels;
            let ym = y * spritePixels + yp * pixelPixels;
            // fill pixel
            ctx.fillRect(xm, ym, pixelPixels, pixelPixels);
          }
        }
      }
    }
  }

  // sketches map with given mouse event data
  function sketchMap(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX;
    const currY = e.clientY - canvas.offsetTop + window.scrollY;
    // get x and y in map units
    const tileX = Math.floor(currX / spritePixels);
    const tileY = Math.floor(currY / spritePixels);
    // get map and map index
    const mapIndex = tileY * mapSize + tileX;
    const newMap = map.slice();
    // return if unchanged
    if (newMap[mapIndex] === currSprite) return;
    // set map
    newMap.splice(mapIndex, 1, currSprite);
    setMap(newMap);
  }

  // on start
  useEffect(() => {
    // get canvas
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
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

  // draw map when any elements change
  useEffect(() => {
    draw();
  }, [colors, sprites, map]);

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
        ref={canvasRef}
        className={styles.screen}
        onMouseDown={e => { sketching = true; sketchMap(e); }}
        onMouseMove={e => { if (sketching) sketchMap(e); }}
        onMouseUp={e => { sketching = false; }}
        onMouseLeave={e => { sketching = false; }}
        width={mapPixels}
        height={mapPixels}
      />
    </div>
  );
}
