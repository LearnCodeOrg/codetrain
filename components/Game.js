import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Frame from '../components/Frame.js';

import { clamp, between } from '../util/math.js';
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
const halfSprite = Math.floor(spritePixels / 2);

const highlightWidth = 4;
const highlightLength = 12;

let canvas, ctx;
let sketching = false;
let holding = false;

export default function Game(props) {
  const {
    tiles, objects, colors, spriteSize, currTile, currObject, codes
  } = props;
  const pixelPixels = Math.floor(spritePixels / spriteSize);

  const [playing, setPlaying] = useState(false);
  const [background, setBackground] = useState(
    Array(mapSize * mapSize).fill(0)
  );
  const [gameObjects, setGameObjects] = useState([]);

  const [showTiles, setShowTiles] = useState(true);
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
        let xm = x + xp * pixelPixels;
        let ym = y + yp * pixelPixels;
        // fill pixel
        ctx.fillRect(xm, ym, pixelPixels, pixelPixels);
      }
    }
  }

  // draws game canvas
  function draw() {
    // if showing tiles
    if (showTiles) {
      // for each tile
      for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
          // get sprite
          const spriteIndex = y * mapSize + x;
          const sprite = tiles[background[spriteIndex]];
          // draw sprite
          drawSprite(sprite, x * spritePixels, y * spritePixels);
        }
      }
    // if not showing tiles
    } else {
      // clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, mapPixels, mapPixels);
    }
    // return if not showing objects
    if (!showObjects) return;
    // for each object
    for (const object of gameObjects) {
      // draw objects
      const { x, y } = object;
      const sprite = objects[object.sprite];
      drawSprite(sprite, x, y);
    }
    // draw object highlight
    if (gameObjects.length) {
      // get selected object
      const selectedObj = gameObjects[gameObjects.length - 1];
      const { x, y } = selectedObj;
      const sprite = objects[selectedObj.sprite];
      ctx.fillStyle = '#fff';
      // calculate highlight units
      const size = highlightLength;
      const left = x - highlightWidth;
      const right = x + spritePixels + highlightWidth - highlightLength;
      const top = y - highlightWidth;
      const bottom = y + spritePixels + highlightWidth - highlightLength;
      // draw highlight
      ctx.fillRect(left, top, size, size);
      ctx.fillRect(right, top, size, size);
      ctx.fillRect(left, bottom, size, size);
      ctx.fillRect(right, bottom, size, size);
      drawSprite(sprite, x, y);
    }
  }

  // sketches map with given mouse event data
  function sketchMap(e) {
    // return if not showing sketch target
    if (currTile !== -1 && !showTiles) return;
    if (currObject !== -1 && !showObjects) return;
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX;
    const currY = e.clientY - canvas.offsetTop + window.scrollY;
    // get x and y in map units
    const tileX = clamp(Math.floor(currX / spritePixels), 0, mapSize - 1);
    const tileY = clamp(Math.floor(currY / spritePixels), 0, mapSize - 1);
    // get map index
    const mapIndex = tileY * mapSize + tileX;
    // sketch tile
    if (currTile !== -1) {
      // update background
      if (background[mapIndex] === currTile) return;
      const newBackground = background.slice();
      newBackground[mapIndex] = currTile;
      setBackground(newBackground);
    // sketch object
    } else {
      const pixeledX = Math.floor(currX / pixelPixels) * pixelPixels;
      const pixeledY = Math.floor(currY / pixelPixels) * pixelPixels;
      const centerX = clamp(pixeledX, halfSprite, mapPixels - halfSprite);
      const centerY = clamp(pixeledY, halfSprite, mapPixels - halfSprite);
      const x = centerX - halfSprite;
      const y = centerY - halfSprite;
      const newGameObjects = gameObjects.slice();
      // if already holding object
      if (holding) {
        // get held object
        const heldIndex = gameObjects.length - 1;
        const heldObject = gameObjects[heldIndex];
        // if held object moved
        if (heldObject.x !== x || heldObject.y !== y) {
          // update held object
          newGameObjects[heldIndex] = { x, y, sprite: heldObject.sprite };
          setGameObjects(newGameObjects);
        }
      // if not holding object
      } else {
        // get clicked objects
        const clicked = gameObjects.filter(obj => (
          between(obj.x, x - halfSprite, x + halfSprite) &&
          between(obj.y, y - halfSprite, y + halfSprite)
        )).reverse();
        // if object clicked
        if (clicked.length) {
          // get held object
          holding = true;
          const heldObject = clicked[0];
          if (heldObject.x === x && heldObject.y === y) return;
          // update held object position
          const heldIndex = newGameObjects.indexOf(heldObject);
          newGameObjects.splice(heldIndex, 1);
          newGameObjects.push({ x, y, sprite: clicked[0].sprite });
          setGameObjects(newGameObjects);
        // if empty space
        } else {
          // create object
          const object = { x, y, sprite: currObject };
          newGameObjects.push(object);
          // start holding and update objects
          holding = true;
          setGameObjects(newGameObjects);
        }
      }
    }
  }

  // returns position of current held object
  function getHeldPosition() {
    // return if no objects
    if (!gameObjects.length) return '(?, ?)';
    const { x, y } = gameObjects[gameObjects.length - 1];
    return `(${Math.floor(x / pixelPixels)}, ${Math.floor(y / pixelPixels)})`;
  }

  // deletes last selected object
  function deleteObject() {
    // return if no objects
    if (!gameObjects.length) return;
    // pop last object
    const newGameObjects = gameObjects.slice();
    newGameObjects.pop();
    setGameObjects(newGameObjects);
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
  }, [colors, tiles, objects, background, gameObjects, showTiles, showObjects]);

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
          tiles={tiles}
          objects={objects}
          background={background}
          gameObjects={gameObjects}
          spriteSize={spriteSize}
          mapSize={mapSize}
        />
      }
      <div style={ playing ? { display: 'none' } : {}}>
        <canvas
          ref={canvasRef}
          className={styles.screen}
          onMouseDown={e => {
            sketching = true;
            holding = false;
            sketchMap(e);
          }}
          onMouseMove={e => {
            if (sketching) sketchMap(e);
          }}
          onMouseUp={e => { sketching = false; }}
          onMouseLeave={e => { sketching = false; }}
          width={mapPixels}
          height={mapPixels}
        />
        <div className={styles.tools}>
          <p>{getHeldPosition()}</p>
          <Button
            onClick={deleteObject}
            disabled={!gameObjects.length}
            variant="contained"
            className={styles.button}
          >
            <DeleteIcon />
          </Button>
          <label htmlFor="showtiles-checkbox">Tiles</label>
          <input
            id="showtiles-checkbox"
            type="checkbox"
            checked={showTiles}
            onChange={e => setShowTiles(e.target.checked)}
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
    </div>
  );
}
