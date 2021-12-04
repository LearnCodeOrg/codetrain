import BrushIcon from '@mui/icons-material/Brush';
import ClearIcon from '@mui/icons-material/Clear';

import { clamp } from '../../util/math';
import { spriteSize } from '../../data/engine';
import { useEffect, useState } from 'react';

import styles from '../../styles/components/engine/Draw.module.css';

let sketching = false;

let canvas, ctx;
let lastX, lastY;

const pixelPixels = 32;
const emptyColor = '#fff';

export default function Draw(props) {
  const {
    containerRef,
    colors, tiles, setTiles, objects, setObjects,
    currTile, currObject, currColor,
    objectNames, setObjectNames, tileNames, setTileNames
  } = props;
  const spritePixels = spriteSize * pixelPixels;

  const [showGrid, setShowGrid] = useState(true);
  const [erasing, setErasing] = useState(false);

  // sketches sprite with given mouse event data
  function sketch(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + containerRef.current.scrollLeft;
    const currY = e.clientY - canvas.offsetTop + containerRef.current.scrollTop;
    // get x and y in pixel units
    const pixelX = clamp(Math.floor(currX / pixelPixels), 0, spriteSize - 1);
    const pixelY = clamp(Math.floor(currY / pixelPixels), 0, spriteSize - 1);
    // return if same as last
    if (pixelX === lastX && pixelY === lastY) return;
    // set new last position
    lastX = pixelX;
    lastY = pixelY;
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
      const color = erasing ? -1 : currColor;
      // return if unchanged
      if (newSprite[spriteIndex] === color) return;
      // set sprite
      newSprite[spriteIndex] = color;
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
        const spriteIndex = y * spriteSize + x;
        const colorIndex = sprite[spriteIndex];
        const color = colorIndex === -1 ? emptyColor : colors[colorIndex];
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

  // updates current object name with given value
  function updateObjectName(val) {
    const newObjectNames = objectNames.slice();
    newObjectNames[currObject] = val;
    setObjectNames(newObjectNames);
  }

  // updates current tile name with given value
  function updateTileName(val) {
    const newTileNames = tileNames.slice();
    newTileNames[currTile] = val;
    setTileNames(newTileNames);
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
        onMouseDown={e => {
          lastX = undefined;
          lastY = undefined;
          sketching = true;
          sketch(e);
        }}
        onMouseMove={e => { if (sketching) sketch(e); }}
        onMouseUp={e => { sketching = false; }}
        onMouseLeave={e => { sketching = false; }}
      />
      <div className={styles.toolbar} onKeyDown={e => e.stopPropagation()}>
        <label>
          Grid
          <input
            type="checkbox"
            checked={showGrid}
            onChange={e => setShowGrid(e.target.checked)}
          />
        </label>
        {
          currObject === -1 ?
          <input
            placeholder="tile name"
            className="grayinput"
            value={tileNames[currTile]}
            onChange={e => updateTileName(e.target.value)}
          /> :
          <>
            <input
              placeholder="object name"
              className="grayinput"
              value={objectNames[currObject]}
              onChange={e => updateObjectName(e.target.value)}
            />
            <button onClick={() => setErasing(!erasing)}>
              {
                erasing ?
                <ClearIcon /> :
                <BrushIcon />
              }
            </button>
          </>
        }
      </div>
    </div>
  );
}
