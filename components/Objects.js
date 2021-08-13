import { clamp } from '../util/math.js';
import { useEffect, useState } from 'react';

import styles from '../styles/Objects.module.css';

const selectPixels = 128;
const selectBorder = 4;

let canvas, ctx;

let sketching = false;

export default function Objects(props) {
  const {
    colors, objects,
    currObject, setCurrObject,
    tileCount, objectCount, spriteSize
  } = props;
  const sqrtSpriteCount = Math.round(Math.sqrt(objectCount));
  const selectSpritePixels = Math.floor(selectPixels / sqrtSpriteCount);
  const selectPixelPixels = Math.floor(selectSpritePixels / spriteSize);
  const fullSelectPixels = selectBorder * 2 + selectPixels;

  // draws select canvas
  function drawSelect() {
    // draw outline
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, fullSelectPixels, fullSelectPixels);
    // for each sprite
    for (let x = 0; x < sqrtSpriteCount; x++) {
      for (let y = 0; y < sqrtSpriteCount; y++) {
        // get sprite
        const spriteIndex = y * sqrtSpriteCount + x;
        const sprite = objects[spriteIndex];
        // for each pixel
        for (let xp = 0; xp < spriteSize; xp++) {
          for (let yp = 0; yp < spriteSize; yp++) {
            // set fill color
            const colorIndex = yp * spriteSize + xp;
            const color = colors[sprite[colorIndex]];
            ctx.fillStyle = color;
            // set fill position and size
            const xPos = x * selectSpritePixels + xp * selectPixelPixels;
            const yPos = y * selectSpritePixels + yp * selectPixelPixels;
            // fill sprite
            ctx.fillRect(
              xPos + selectBorder, yPos + selectBorder,
              selectPixelPixels, selectPixelPixels
            );
          }
        }
      }
    }
    // return if no object selected
    if (currObject === -1) return;
    // get outline coordinates
    const xo = currObject % 4;
    const yo = Math.floor(currObject / 4);
    // draw outer outline
    ctx.fillStyle = '#fff';
    const outLeft = xo * selectSpritePixels;
    const outRight = outLeft + selectSpritePixels + selectBorder;
    const outTop = yo * selectSpritePixels;
    const outBottom = outTop + selectSpritePixels + selectBorder;
    const outLength = selectBorder * 2 + selectSpritePixels;
    ctx.fillRect(outLeft, outTop, outLength, selectBorder);
    ctx.fillRect(outLeft, outTop, selectBorder, outLength);
    ctx.fillRect(outLeft, outBottom, outLength, selectBorder);
    ctx.fillRect(outRight, outTop, selectBorder, outLength);
    // draw inner outline
    ctx.fillStyle = '#000';
    const inLeft = outLeft + selectBorder;
    const inRight = outLeft + selectSpritePixels;
    const inTop = outTop + selectBorder;
    const inBottom = outTop + selectSpritePixels;
    const inLength = selectSpritePixels;
    ctx.fillRect(inLeft, inTop, inLength, selectBorder);
    ctx.fillRect(inLeft, inTop, selectBorder, inLength);
    ctx.fillRect(inLeft, inBottom, inLength, selectBorder);
    ctx.fillRect(inRight, inTop, selectBorder, inLength);
  }

  // selects sprite with given mouse event data
  function select(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX - selectBorder;
    const currY = e.clientY - canvas.offsetTop + window.scrollY - selectBorder;
    // get x and y in grid units
    const gridX = clamp(Math.floor(currX / selectSpritePixels), 0, sqrtSpriteCount - 1);
    const gridY = clamp(Math.floor(currY / selectSpritePixels), 0, sqrtSpriteCount - 1);
    // select sprite
    const spriteIndex = gridY * sqrtSpriteCount + gridX;
    if (spriteIndex === currObject) return;
    setCurrObject(spriteIndex);
    // draw select canvas
    drawSelect();
  }

  // get canvas context on start
  useEffect(() => {
    canvas = document.getElementById('object-select');
    ctx = canvas.getContext('2d');
  }, []);

  // draw select when colors or objects change
  useEffect(() => {
    drawSelect();
  }, [colors, objects, currObject]);

  return (
    <div className={styles.container}>
      <h1>Objects</h1>
      <canvas
        id="object-select"
        width={fullSelectPixels}
        height={fullSelectPixels}
        className={styles.selectcanvas}
        onMouseDown={select}
      />
    </div>
  );
}
