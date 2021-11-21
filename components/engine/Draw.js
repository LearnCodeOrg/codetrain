import { clamp } from '../../util/math';
import { spriteSize } from '../../data/engine';
import { useEffect, useState } from 'react';

import styles from '../../styles/components/engine/Draw.module.css';

let sketching = false;

let canvas, ctx;

const pixelPixels = 32;

export default function Draw(props) {
  const {
    container,
    colors, tiles, setTiles, objects, setObjects,
    currTile, currObject, currColor
  } = props;
  const spritePixels = spriteSize * pixelPixels;

  const [showGrid, setShowGrid] = useState(true);

  // sketches sprite with given mouse event data
  function sketch(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + container.scrollLeft;
    const currY = e.clientY - canvas.offsetTop + container.scrollTop;
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
    if (showGrid) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, spritePixels, spritePixels);
    }
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
        if (showGrid) {
          ctx.fillRect(xPos + 1, yPos + 1, pixelPixels - 2, pixelPixels - 2);
        } else {
          // fill sprite
          ctx.fillRect(xPos, yPos, pixelPixels, pixelPixels);
        }
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
  }, [colors, tiles, objects, currTile, currObject, showGrid]);

  return (
    <div className={styles.container}>
      <canvas
        className={styles.spritedraw}
        id="sprite-draw"
        width={spritePixels}
        height={spritePixels}
        onMouseDown={e => { sketching = true; sketch(e); }}
        onMouseMove={e => { if (sketching) sketch(e); }}
        onMouseUp={e => { sketching = false; }}
        onMouseLeave={e => { sketching = false; }}
      />
      <div className={styles.toolbar}>
        <label>
          Grid
          <input
            type="checkbox"
            checked={showGrid}
            onChange={e => setShowGrid(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
}
