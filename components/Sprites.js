import { useEffect, useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Sprites.module.css';

const pixelPixels = 16;
const selectPixels = 128;
const selectBorder = 4;

let selectCanvas, selectCtx;
let drawCanvas, drawCtx;

let sketching = false;

export default function Sprites(props) {
  const {
    colors, setColors, sprites, setSprites, spriteTypes, setSpriteTypes,
    currSprite, setCurrSprite, spriteCount, spriteSize
  } = props;
  const spritePixels = spriteSize * pixelPixels;
  const sqrtSpriteCount = Math.round(Math.sqrt(spriteCount));
  const selectSpritePixels = Math.floor(selectPixels / sqrtSpriteCount);
  const selectPixelPixels = Math.floor(selectSpritePixels / spriteSize);
  const fullSelectPixels = selectBorder * 2 + selectPixels;

  const [currColor, setCurrColor] = useState(0);

  const [palette, setPalette] = useState(0);

  // updates current color with given value
  function updateColor(val) {
    const newColors = colors.slice();
    newColors.splice(currColor, 1, val);
    setColors(newColors);
  }

  // draws select canvas
  function drawSelect() {
    // draw outline
    selectCtx.fillStyle = '#000';
    selectCtx.fillRect(0, 0, fullSelectPixels, fullSelectPixels);
    // for each sprite
    for (let x = 0; x < sqrtSpriteCount; x++) {
      for (let y = 0; y < sqrtSpriteCount; y++) {
        // get sprite
        const spriteIndex = y * sqrtSpriteCount + x;
        const sprite = sprites[spriteIndex];
        // for each pixel
        for (let xp = 0; xp < spriteSize; xp++) {
          for (let yp = 0; yp < spriteSize; yp++) {
            // set fill color
            const colorIndex = yp * spriteSize + xp;
            const color = colors[sprite[colorIndex]];
            selectCtx.fillStyle = color;
            // set fill position and size
            const xPos = x * selectSpritePixels + xp * selectPixelPixels;
            const yPos = y * selectSpritePixels + yp * selectPixelPixels;
            // fill sprite
            selectCtx.fillRect(
              xPos + selectBorder, yPos + selectBorder,
              selectPixelPixels, selectPixelPixels
            );
          }
        }
      }
    }
    // get outline coordinates
    const xo = currSprite % 4;
    const yo = Math.floor(currSprite / 4);
    // draw outer outline
    selectCtx.fillStyle = '#fff';
    const outLeft = xo * selectSpritePixels;
    const outRight = outLeft + selectSpritePixels + selectBorder;
    const outTop = yo * selectSpritePixels;
    const outBottom = outTop + selectSpritePixels + selectBorder;
    const outLength = selectBorder * 2 + selectSpritePixels;
    selectCtx.fillRect(outLeft, outTop, outLength, selectBorder);
    selectCtx.fillRect(outLeft, outTop, selectBorder, outLength);
    selectCtx.fillRect(outLeft, outBottom, outLength, selectBorder);
    selectCtx.fillRect(outRight, outTop, selectBorder, outLength);
    // draw inner outline
    selectCtx.fillStyle = '#000';
    const inLeft = outLeft + selectBorder;
    const inRight = outLeft + selectSpritePixels;
    const inTop = outTop + selectBorder;
    const inBottom = outTop + selectSpritePixels;
    const inLength = selectSpritePixels;
    selectCtx.fillRect(inLeft, inTop, inLength, selectBorder);
    selectCtx.fillRect(inLeft, inTop, selectBorder, inLength);
    selectCtx.fillRect(inLeft, inBottom, inLength, selectBorder);
    selectCtx.fillRect(inRight, inTop, selectBorder, inLength);
  }

  // selects sprite with given mouse event data
  function select(e) {
    // get x and y on canvas
    const currX =
    e.clientX - selectCanvas.offsetLeft + window.scrollX - selectBorder;
    const currY =
    e.clientY - selectCanvas.offsetTop + window.scrollY - selectBorder;
    // get x and y in grid units
    const gridX = Math.max(
      0, Math.min(Math.floor(currX / selectSpritePixels), sqrtSpriteCount - 1)
    );
    const gridY = Math.max(
      0, Math.min(Math.floor(currY / selectSpritePixels), sqrtSpriteCount - 1)
    );
    // select sprite
    const spriteIndex = gridY * sqrtSpriteCount + gridX;
    if (spriteIndex === currSprite) return;
    setCurrSprite(spriteIndex);
    // draw select canvas
    drawSelect();
  }

  // draws current sprite
  function draw() {
    // get current sprite
    const sprite = sprites[currSprite];
    // for each pixel
    for (let x = 0; x < spriteSize; x++) {
      for (let y = 0; y < spriteSize; y++) {
        // set fill color
        const colorIndex = y * spriteSize + x;
        const color = colors[sprite[colorIndex]];
        drawCtx.fillStyle = color;
        // set fill position and size
        const xPos = x * pixelPixels;
        const yPos = y * pixelPixels;
        // fill sprite
        drawCtx.fillRect(xPos, yPos, pixelPixels, pixelPixels);
      }
    }
    // update select canvas
    drawSelect();
  }

  // sketches sprite with given mouse event data
  function sketch(e) {
    // get x and y on canvas
    const currX = e.clientX - drawCanvas.offsetLeft + window.scrollX;
    const currY = e.clientY - drawCanvas.offsetTop + window.scrollY;
    // get x and y in pixel units
    const pixelX = Math.max(
      0, Math.min(Math.floor(currX / pixelPixels), spriteSize - 1)
    );
    const pixelY = Math.max(
      0, Math.min(Math.floor(currY / pixelPixels), spriteSize - 1)
    );
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
    selectCanvas = document.getElementById('sprite-select');
    selectCtx = selectCanvas.getContext('2d');
    drawCanvas = document.getElementById('sprite-draw');
    drawCtx = drawCanvas.getContext('2d');
  }, []);

  // draw sprite when colors or sprites change
  useEffect(() => {
    draw();
  }, [colors, sprites, currSprite]);

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
        <canvas
          id="sprite-select"
          width={fullSelectPixels}
          height={fullSelectPixels}
          className={styles.selectcanvas}
          onMouseDown={select}
        />
        <canvas
          id="sprite-draw"
          width={spritePixels}
          height={spritePixels}
          onMouseDown={e => { sketching = true; sketch(e); }}
          onMouseMove={e => { if (sketching) sketch(e); }}
          onMouseUp={e => { sketching = false; }}
          onMouseLeave={e => { sketching = false; }}
        />
        <select
          value={spriteTypes[currSprite]}
          onChange={e => {
            const newType = e.target.value;
            const newSpriteTypes = spriteTypes.slice();
            newSpriteTypes.splice(currSprite, 1, newType);
            setSpriteTypes(newSpriteTypes);
          }}
        >
          <option value="background">Background</option>
          {currSprite !== 0 && <option value="object">Object</option>}
        </select>
      </div>
    </div>
  );
}
