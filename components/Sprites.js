import { useEffect, useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Sprites.module.css';

// units
const spriteCount = 16;
const spriteSize = 8;
const pixelPixels = 16;
const spritePixels = spriteSize * pixelPixels;

let spriteCanvas, spriteCtx;

let sketching = false;

export default function Sprites() {
  const defaultColors = palettes[0].colors;
  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);

  const defaultSprites = Array(spriteCount).fill(
    Array(spriteSize * spriteSize).fill(0)
  );
  const [sprites, setSprites] = useState(defaultSprites);
  const [currSprite, setCurrSprite] = useState(0);

  const [palette, setPalette] = useState(0);

  // updates current color with given value
  function updateColor(val) {
    const newColors = colors.slice();
    newColors.splice(currColor, 1, val);
    setColors(newColors);
  }

  // sketches sprite with given mouse event data
  function sketch(e) {
    // get x and y on canvas
    const currX = e.clientX - spriteCanvas.offsetLeft + window.scrollX;
    const currY = e.clientY - spriteCanvas.offsetTop + window.scrollY;
    // get x and y in pixel units
    const pixelX = Math.floor(currX / pixelPixels);
    const pixelY = Math.floor(currY / pixelPixels);
    // get sprite
    const spriteIndex = pixelY * spriteSize + pixelX;
    const newSprites = sprites.slice();
    const newSprite = newSprites[currSprite].slice();
    // return if unchanged
    if (newSprite[spriteIndex] === currColor) return;
    // set sprite
    newSprite.splice(spriteIndex, 1, currColor);
    newSprites.splice(currSprite, 1, newSprite);
    setSprites(newSprites);
  }

  // get canvas contexts on start
  useEffect(() => {
    spriteCanvas = document.getElementById('sprite-canvas');
    spriteCtx = spriteCanvas.getContext('2d');
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <h1>Colors</h1>
        <div className={styles.tilegrid}>
          {
            colors.map((color, i) =>
              <div
                onClick={() => setCurrColor(i)}
                className={
                  currColor === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={i}
                style={{ background: color }}
              >
              </div>
            )
          }
        </div>
        <input
          type="color"
          value={colors[currColor]}
          className={styles.colorinput}
          onChange={e => updateColor(e.target.value)}
        />
        <select
          value={palette}
          onChange={e => {
            const newPalette = e.target.value;
            setPalette(newPalette);
            setColors(palettes[newPalette].colors);
          }}
        >
        {
          palettes.map((pal, i) =>
            <option value={i} key={i}>{pal.name}</option>
          )
        }
        </select>
      </div>
      <div>
        <h1>Sprites</h1>
        <div className={styles.tilegrid}>
          {
            sprites.map((sprite, i) =>
              <div
                onClick={() => setCurrSprite(i)}
                className={
                  currSprite === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={i}
                style={{ background: colors[sprite[0]] }}
              >
              </div>
            )
          }
        </div>
        <canvas
          id="sprite-canvas"
          width={spritePixels}
          height={spritePixels}
          onMouseDown={e => { sketching = true; sketch(e); }}
          onMouseMove={e => { if (sketching) sketch(e); }}
          onMouseUp={e => { sketching = false; }}
          onMouseLeave={e => { sketching = false; }}
        />
      </div>
    </div>
  );
}
