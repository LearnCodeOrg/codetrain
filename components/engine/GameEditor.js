import Router from 'next/router';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import GameFrame from '../GameFrame';

import { clamp, between } from '../../util/math';
import { spriteSize, mapSize } from '../../data/engine';
import { insertObjectUnits, removeObjectUnits } from '../../util/objectUnits';
import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import signInWithGoogle from '../../util/signInWithGoogle.js';
import createUser from '../../util/createUser.js';
import compileCode from '../../util/compileCode.js';
import firebase from 'firebase/app';

import styles from '../../styles/components/engine/GameEditor.module.css';

const keys = {};

const buttonProps = {
  className: styles.button,
  variant: 'contained'
};

// units
const mapPixels = 512;
const spritePixels = Math.floor(mapPixels / mapSize);
const halfSprite = Math.floor(spritePixels / 2);

const highlightWidth = 4;
const highlightLength = 12;

let canvas, ctx;
let sketching = false;
let holding = false;

let editorDirty = false;

export default function GameEditor(props) {
  const {
    projectId, creator, username,
    colors, currTile, currObject, codes,
    objectNames, tiles, objects
  } = props;
  const pixelPixels = Math.floor(spritePixels / spriteSize);

  const { enqueueSnackbar } = useSnackbar();

  const [playing, setPlaying] = useState(false);
  const [background, setBackground] = useState(props.background);
  const [gameObjects, setGameObjects] = useState(
    insertObjectUnits(props.gameObjects, pixelPixels)
  );

  const [showGrid, setShowGrid] = useState(true);
  const [showTiles, setShowTiles] = useState(true);
  const [showObjects, setShowObjects] = useState(true);
  const [showHighlight, setShowHighlight] = useState(false);

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const canvasRef = useRef();
  const didMountRef = useRef(false);

  const projectsRef = firebase.firestore().collection('projects');
  const uid = firebase.auth().currentUser?.uid;

  // called before page unloads
  function beforeUnload(e) {
    // return if editor not dirty
    if (!editorDirty) return;
    // cancel unload
    e.preventDefault();
    e.returnValue = '';
  }

  // saves project to firebase
  async function saveProject() {
    // return if not authed
    if (!uid) return;
    // construct project object
    const projectObj = {
      username, uid: uid,
      title, description, objectNames,
      codes, colors, background,
      gameObjects: removeObjectUnits(gameObjects, pixelPixels),
      tiles: JSON.stringify(tiles),
      objects: JSON.stringify(objects),
      modified: new Date().getTime()
    };
    // if own project and existing, save
    if (props.creator && uid === props.creator && projectId) {
      await projectsRef.doc(projectId).update(projectObj);
      editorDirty = false;
      enqueueSnackbar('Saved successfully.', { variant: 'success' });
    // if no existing project, publish new project
    } else {
      const docRef = await projectsRef.add({
        created: new Date().getTime(), ...projectObj
      });
      editorDirty = false;
      Router.push(`/projects/${docRef.id}`);
    }
  }

  // draws given sprite at given position
  function drawSprite(sprite, x, y) {
    // for each pixel
    for (let yPix = 0; yPix < spriteSize; yPix++) {
      for (let xPix = 0; xPix < spriteSize; xPix++) {
        // set fill color
        const colorIndex = yPix * spriteSize + xPix;
        const color = colors[sprite[colorIndex]];
        ctx.fillStyle = color;
        // get fill position
        let xMap = x + xPix * pixelPixels;
        let yMap = y + yPix * pixelPixels;
        let pWidth = pixelPixels;
        let pHeight = pixelPixels;
        // update pixel if showing grid
        if (showGrid) {
          if (xPix === 0) { xMap += 1; pWidth -= 1; }
          if (yPix === 0) { yMap += 1; pHeight -= 1; }
          if (xPix === spriteSize - 1) pWidth -= 1;
          if (yPix === spriteSize - 1) pHeight -= 1;
        }
        // fill pixel
        ctx.fillRect(xMap, yMap, pWidth, pHeight);
      }
    }
  }

  // draws game canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, mapPixels, mapPixels);
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
    if (showHighlight && gameObjects.length) {
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
    // return if tutorial
    if (props.tutorial) return;
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
    if (!gameObjects.length) return undefined;
    const { x, y } = gameObjects[gameObjects.length - 1];
    return `(${Math.floor(x / pixelPixels)}, ${Math.floor(y / pixelPixels)})`;
  }

  // deletes last selected object
  function deleteObject() {
    // return if no objects
    if (!gameObjects.length) return;
    // return if not confirmed
    if (!window.confirm('Delete object?')) return;
    // pop last object
    const newGameObjects = gameObjects.slice();
    newGameObjects.pop();
    setGameObjects(newGameObjects);
  }

  // compiles code and returns whether successful
  function compile() {
    // for each code snippet
    for (let i = 0; i < codes.length; i++) {
      // try compiling code
      const header = objectNames[i];
      const error = compileCode(codes[i]);
      // if error
      if (error) {
        // enqueue snackbar and return false
        enqueueSnackbar(`[${header}] ${error}`, { variant: 'error' });
        return false;
      }
    }
    // if no fails, return true
    return true;
  }

  // toggles game playing
  function togglePlay() {
    // if playing, stop playing
    if (playing) setPlaying(false);
    // if no playing, compile and start
    else {
      if (compile()) setPlaying(true);
    }
  }

  // on start
  useEffect(() => {
    // get canvas
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    // initialize unload event listener
    window.addEventListener('beforeunload', beforeUnload);
  }, []);

  // draw map when any elements change
  useEffect(() => {
    draw();
  }, [
    colors, tiles, objects, background, gameObjects,
    showGrid, showTiles, showObjects, showHighlight
  ]);

  // change object highlight on select change
  useEffect(() => {
    if (showHighlight && currObject === -1) setShowHighlight(false);
    else if (!showHighlight && currObject !== -1) setShowHighlight(true);
  }, [currTile, currObject]);

  // set up changes may not be saved popup
  useEffect(() => {
    if (didMountRef.current) {
      if (!editorDirty) editorDirty = true;
    }
    else didMountRef.current = true;
  }, [
    colors, tiles, objects, background, gameObjects, codes, objectNames,
    title, description
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.databar}>
        {
          username === null ?
          <button onClick={createUser}>Choose Username</button> :
          username ?
          <form className={styles.saveform} onSubmit={e => {
            e.preventDefault();
            saveProject();
          }}>
            <input
              placeholder="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <button>
              {
                !creator ? 'Create' :
                uid === creator ? 'Save' :
                'Remix'
              }
            </button>
          </form> :
          <button onClick={signInWithGoogle}>Sign in to save</button>
        }
      </div>
      {
        playing &&
        <GameFrame
          mapPixels={mapPixels}
          spritePixels={spritePixels}
          pixelPixels={pixelPixels}
          codes={codes}
          colors={colors}
          tiles={tiles}
          objects={objects}
          background={background}
          gameObjects={gameObjects}
          download
        />
      }
      <canvas
        style={ playing ? { display: 'none' } : {}}
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
        {
          !playing &&
          <>
            <label>
              Grid
              <input
                type="checkbox"
                checked={showGrid}
                onChange={e => setShowGrid(e.target.checked)}
              />
            </label>
            <label>
              Tiles
              <input
                type="checkbox"
                checked={showTiles}
                onChange={e => setShowTiles(e.target.checked)}
              />
            </label>
            <label>
              Objects
              <input
                type="checkbox"
                checked={showObjects}
                onChange={e => setShowObjects(e.target.checked)}
              />
            </label>
            {
              (showHighlight && !!gameObjects.length) &&
              <>
                <p>{getHeldPosition()}</p>
                <Button
                  className="circlebutton"
                  onClick={deleteObject}
                  disabled={!gameObjects.length}
                  variant="contained"
                >
                  <DeleteIcon />
                </Button>
              </>
            }
          </>
        }
        <span className="flexfill" />
        <Button
          className="circlebutton"
          variant="contained"
          onClick={togglePlay}
        >
          {playing ? <StopIcon /> : <PlayArrowIcon />}
        </Button>
      </div>
    </div>
  );
}
