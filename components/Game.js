import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';
import Frame from '../components/Frame.js';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/Game.module.css';

const keys = {};

const buttonProps = {
  className: styles.button,
  variant: 'contained'
};

// units
const mapPixels = 256;
const mapSize = 8;
const spritePixels = Math.floor(mapPixels / mapSize);

let canvas, ctx;
let sketching = false;

export default function Game(props) {
  const {
    sprites, colors, spriteSize, currSprite, spriteTypes, codes
  } = props;
  const pixelPixels = Math.floor(spritePixels / spriteSize);

  const [playing, setPlaying] = useState(false);
  const [background, setBackground] = useState(
    Array(mapSize * mapSize).fill(0)
  );
  const [objects, setObjects] = useState(Array(mapSize * mapSize).fill(-1));

  const [showObjects, setShowObjects] = useState(true);

  const canvasRef = useRef();

  // draws given sprite at given position
  function drawSprite(sprite, x, y) {
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

  // draws game canvas
  function draw() {
    // for each tile
    for (let y = 0; y < mapSize; y++) {
      for (let x = 0; x < mapSize; x++) {
        // get sprite
        const spriteIndex = y * mapSize + x;
        const sprite = (objects[spriteIndex] === -1 || !showObjects) ?
        sprites[background[spriteIndex]] : sprites[objects[spriteIndex]];
        // draw sprite
        drawSprite(sprite, x, y);
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
    // get sprite type and map index
    const spriteType = spriteTypes[currSprite];
    const mapIndex = tileY * mapSize + tileX;
    // update background
    if (spriteType === 'background') {
      if (background[mapIndex] === currSprite) return;
      const newBackground = background.slice();
      newBackground[mapIndex] = currSprite;
      setBackground(newBackground);
    // update objects
    } else if (spriteTypes[currSprite] === 'object') {
      const newSprite = objects[mapIndex] === currSprite ? -1 : currSprite;
      const newObjects = objects.slice();
      newObjects[mapIndex] = newSprite;
      setObjects(newObjects);
      sketching = false;
    }
  }

  // on start
  useEffect(() => {
    // get canvas
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // draw map when any elements change
  useEffect(() => {
    draw();
  }, [colors, sprites, background, objects, showObjects]);

  // update map on sprite types change
  useEffect(() => {
    // slice map
    const newBackground = background.slice();
    const newObjects = objects.slice();
    // background to object
    for (let i = 0; i < background.length; i++) {
      const sprite = background[i];
      if (spriteTypes[sprite] === 'object') {
        newBackground[i] = 0;
        newObjects[i] = sprite;
      }
    }
    // object to background
    for (let i = 0; i < objects.length; i++) {
      const sprite = objects[i];
      if (spriteTypes[sprite] === 'background') {
        newBackground[i] = sprite;
        newObjects[i] = -1;
      }
    }
    // update map
    setBackground(newBackground);
    setObjects(newObjects);
  }, [spriteTypes]);

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        variant="contained"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <StopIcon /> : <PlayArrowIcon />}
      </Button>
      {
        playing &&
        <Frame
          mapPixels={mapPixels}
          spritePixels={spritePixels}
          pixelPixels={pixelPixels}
          codes={codes}
          colors={colors}
          sprites={sprites}
          background={background}
          objects={objects}
          spriteSize={spriteSize}
          mapSize={mapSize}
        />
      }
      <div style={ playing ? { display: 'none' } : {}}>
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
        <label htmlFor="showobjects-checkbox">Objects</label>
        <input
          id="showobjects-checkbox"
          type="checkbox"
          checked={showObjects}
          onChange={e => setShowObjects(e.target.checked)}
        />
      </div>
    </div>
  );
}
