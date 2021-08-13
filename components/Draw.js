import { clamp } from '../util/math.js';
import { useEffect } from 'react';

import styles from '../styles/Draw.module.css';

let sketching = false;

let canvas, ctx;

const pixelPixels = 16;

export default function Draw(props) {
  const {
    colors, tiles, setTiles, objects, setObjects,
    currTile, currObject, currColor, spriteSize
  } = props;
  const spritePixels = spriteSize * pixelPixels;

  // sketches sprite with given mouse event data
  function sketch(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX;
    const currY = e.clientY - canvas.offsetTop + window.scrollY;
    // get x and y in pixel units
    const pixelX = clamp(Math.floor(currX / pixelPixels), 0, spriteSize - 1);
    const pixelY = clamp(Math.floor(currY / pixelPixels), 0, spriteSize - 1);
    // get sprite
    const spriteIndex = pixelY * spriteSize + pixelX;
    if (currTile !== -1) {
      const newTiles = tiles.slice();
      const newSprite = tiles[currTile].slice();
      // return if unchanged
      if (newSprite[spriteIndex] === currColor) return;
      // set sprite
      newSprite[spriteIndex] = currColor;
      newTiles[currTile] = newSprite;
      setTiles(newTiles);
    } else {
      const newObjects = objects.slice();
      const newSprite = objects[currObject].slice();
      // return if unchanged
      if (newSprite[spriteIndex] === currColor) return;
      // set sprite
      newSprite[spriteIndex] = currColor;
      newObjects[currObject] = newSprite;
      setObjects(newObjects);
    }
  }

  // draws current tile
  function draw() {
    // get current sprite
    const sprite = currTile === -1 ? objects[currObject] : tiles[currTile];
    // for each pixel
    for (let x = 0; x < spriteSize; x++) {
      for (let y = 0; y < spriteSize; y++) {
        // set fill color
        const colorIndex = y * spriteSize + x;
        const color = colors[sprite[colorIndex]];
        ctx.fillStyle = color;
        // set fill position and size
        const xPos = x * pixelPixels;
        const yPos = y * pixelPixels;
        // fill sprite
        ctx.fillRect(xPos, yPos, pixelPixels, pixelPixels);
      }
    }
  }

  useEffect(() => {
    canvas = document.getElementById('sprite-draw');
    ctx = canvas.getContext('2d');
  }, []);

  // draw sprite when colors or tiles change
  useEffect(() => {
    draw();
  }, [colors, tiles, objects, currTile, currObject]);

  return (
    <div>
      <canvas
        id="sprite-draw"
        width={spritePixels}
        height={spritePixels}
        onMouseDown={e => { sketching = true; sketch(e); }}
        onMouseMove={e => { if (sketching) sketch(e); }}
        onMouseUp={e => { sketching = false; }}
        onMouseLeave={e => { sketching = false; }}
      />
    </div>
  );
}
