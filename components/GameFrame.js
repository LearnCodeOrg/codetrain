import GetAppIcon from '@mui/icons-material/GetApp';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';

import { useEffect, useRef, useState } from 'react';
import { spriteSize, mapSize } from '../data/engine';

import styles from '../styles/components/GameFrame.module.css';

export default function GameFrame(props) {
  const {
    mapPixels, spritePixels, pixelPixels,
    codes, colors, tiles, objects, background, gameObjects
  } = props;

  const screenRef = useRef();

  // returns function definition for given object
  function getCodeFunction(gameObject, index) {
    const { id, x, y, sprite } = gameObject;
    return (
`(function() {
  const $$index = ${index};
  const move = dir => $$.move($$index, dir);
  const movePixels = (x, y) => $$.movePixels($$index, x, y);
  const moveTiles = (x, y) => $$.moveTiles($$index, x, y);
  const setPixelPos = (x, y) => $$.setPixelPos($$index, x, y);
  const setTilePos = (x, y) => $$.setTilePos($$index, x, y);
  const getPixelPos = () => $$.getPixelPos($$index);
  const getTilePos = () => $$.getTilePos($$index);
  const getTile = () => $$.getTile($$index);
  const setTile = tile => $$.setTile($$index, tile);
  const getTileAt = (x, y) => $$.background[y * $$.mapSize + x];
  const setTileAt = (x, y, tile) => { $$.background[y * $$.mapSize + x] = tile; }
  const say = text => { $$.dialogue = \`\${text}\`; }
  const getObjectById = id => $$.getObjectById(id);
  ${codes[sprite]}
  return {
    id: '${id}',
    move, movePixels, moveTiles, getTile, setTile,
    setPixelPos, setTilePos, getPixelPos, getTilePos,
    start: typeof start === 'function' ? start : () => {},
    update: typeof update === 'function' ? update : () => {}
  };
})()`);
  }

  const gameSrc =
`<html>
  <body onload="__start__()">
    <canvas
      id="$$canvas"
      width=${mapPixels}
      height=${mapPixels}
    />
  </body>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #fff;
    }
    .error {
      margin: 10px;
      position: absolute;
      top: 0;
      color: red;
      font-family:
        'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    }
  </style>
  <script>
    // backend variables
    const $$ = {
      ctx: $$canvas.getContext('2d'),
      dialogue: undefined,
      mapSize: ${mapSize},
      mapPixels: ${mapPixels},
      spriteSize: ${spriteSize},
      spritePixels: ${spritePixels},
      pixelPixels: ${pixelPixels},
      colors: ${JSON.stringify(colors)},
      tiles: ${JSON.stringify(tiles)},
      objects: ${JSON.stringify(objects)},
      background: ${JSON.stringify(background)},
      gameObjects: ${JSON.stringify(gameObjects)},
      lastPressedKeys: {},
      pressedKeys: {},
      move: (index, dir) => {
        if (dir === 'up') $$.gameObjects[index].y -= $$.spritePixels;
        else if (dir === 'down') $$.gameObjects[index].y += $$.spritePixels;
        else if (dir === 'left') $$.gameObjects[index].x -= $$.spritePixels;
        else if (dir === 'right') $$.gameObjects[index].x += $$.spritePixels;
      },
      movePixels: (index, x, y) => {
        $$.gameObjects[index].x += x * $$.pixelPixels;
        $$.gameObjects[index].y += y * $$.pixelPixels;
      },
      moveTiles: (index, x, y) => {
        $$.gameObjects[index].x += x * $$.spritePixels;
        $$.gameObjects[index].y += y * $$.spritePixels;
      },
      setPixelPos: (index, x, y) => {
        $$.gameObjects[index].x = x * $$.pixelPixels;
        $$.gameObjects[index].y = y * $$.pixelPixels;
      },
      setTilePos: (index, x, y) => {
        $$.gameObjects[index].x = x * $$.spritePixels;
        $$.gameObjects[index].y = y * $$.spritePixels;
      },
      getPixelPos: (index) => {
        return {
          x: Math.floor($$.gameObjects[index].x / $$.pixelPixels),
          y: Math.floor($$.gameObjects[index].y / $$.pixelPixels)
        };
      },
      getTilePos: (index) => {
        return {
          x: Math.floor($$.gameObjects[index].x / $$.spritePixels),
          y: Math.floor($$.gameObjects[index].y / $$.spritePixels)
        };
      },
      getTile: (index) => {
        const pos = $$.getTilePos(index);
        const tileIndex = pos.y * $$.mapSize + pos.x;
        return $$.background[tileIndex];
      },
      setTile: (index, tile) => {
        const pos = $$.getTilePos(index);
        const tileIndex = pos.y * $$.mapSize + pos.x;
        $$.background[tileIndex] = tile;
      },
      getObjectById: (id) => {
        return $$.spriteCodes.find(obj => obj.id === id) ?? null;
      },
      throwError: (message) => {
        // clear canvas
        $$.ctx.fillStyle = '#fff';
        $$.ctx.fillRect(0, 0, $$.mapPixels, $$.mapPixels);
        // create error text
        const p = document.createElement('p');
        p.className = 'error';
        p.innerText = message;
        document.body.appendChild(p);
      }
    }
    // set up input listeners
    window.onkeydown = e => {
      $$.pressedKeys[e.keyCode] = true;
      $$.dialogue = undefined;
    }
    window.onkeyup = e => $$.pressedKeys[e.keyCode] = false;
    window.onmousedown = e => { $$.dialogue = undefined; }
    function isKeyDown(key) {
      // handle invalid key
      if (typeof key !== 'string' || !key.length) return undefined;
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return $$.pressedKeys[keyCode];
    }
    function isKey(key) {
      // handle invalid key
      if (typeof key !== 'string' || !key.length) return undefined;
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return $$.pressedKeys[keyCode] && !$$.lastPressedKeys[keyCode];
    }
    // runs after body has loaded
    function __start__() {
      // canvas functions
      function drawSprite(sprite, x, y) {
        // for each pixel
        for (let yp = 0; yp < $$.spriteSize; yp++) {
          for (let xp = 0; xp < $$.spriteSize; xp++) {
            // set fill color
            const colorIndex = yp * $$.spriteSize + xp;
            const color = $$.colors[sprite[colorIndex]];
            $$.ctx.fillStyle = color;
            // get fill position
            let xm = x + xp * $$.pixelPixels;
            let ym = y + yp * $$.pixelPixels;
            // fill pixel
            $$.ctx.fillRect(xm, ym, $$.pixelPixels, $$.pixelPixels);
          }
        }
      }
      // draws the canvas
      function draw() {
        // for each tile
        for (let y = 0; y < $$.mapSize; y++) {
          for (let x = 0; x < $$.mapSize; x++) {
            // get sprite
            const spriteIndex = y * $$.mapSize + x;
            const sprite = $$.tiles[$$.background[spriteIndex]];
            // draw sprite
            drawSprite(sprite, x * $$.spritePixels, y * $$.spritePixels);
          }
        }
        // for each object
        for (const object of $$.gameObjects) {
          // draw object
          const { x, y } = object;
          const sprite = $$.objects[object.sprite];
          drawSprite(sprite, x, y);
        }
        // draw dialogue text
        if ($$.dialogue) {
          const left = $$.mapPixels / 8;
          const top = $$.mapPixels * 3 / 8;
          const offset = 8;
          const width = $$.mapPixels * 3 / 4 + offset * 2;
          const height = $$.mapPixels / 4 + offset * 2;
          $$.ctx.fillStyle = '#fff';
          $$.ctx.fillRect(left - offset, top - offset, width, height);
          $$.ctx.fillStyle = '#000';
          const fontSize = 16;
          const lineSize = 20;
          $$.ctx.font = \`\${fontSize}px monospace\`;
          const line1 = $$.dialogue.slice(0, lineSize);
          const line2 = $$.dialogue.slice(lineSize, lineSize * 2);
          const line3 = $$.dialogue.slice(lineSize * 2, lineSize * 3);
          const line4 = $$.dialogue.slice(lineSize * 3, lineSize * 4);
          $$.ctx.fillText(line1, left, top + fontSize);
          $$.ctx.fillText(line2, left, top + fontSize * 2);
          $$.ctx.fillText(line3, left, top + fontSize * 3);
          $$.ctx.fillText(line4, left, top + fontSize * 4);
        }
      }
      // game loop
      function gameLoop(time) {
        try {
          // run update functions
          $$.spriteCodes.forEach(code => code.update());
        // throw error
        } catch (e) {
          $$.throwError(e);
          return;
        }
        // draw
        draw();
        // update keys
        $$.lastPressedKeys = Object.assign({}, $$.pressedKeys);
        // continue loop
        requestAnimationFrame(gameLoop);
      }
      // try starting game
      try {
        // initialize user code
        $$.spriteCodes = [
          ${gameObjects.map((gameObject, index) =>
            getCodeFunction(gameObject, index)
          ).join(',\n')}
        ];
        // start game loop
        $$.spriteCodes.forEach(code => code.start());
        requestAnimationFrame(gameLoop);
      // throw error
      } catch (e) {
        $$.throwError(e);
      }
    }
  </script>
</html>
`;

  const [source, setSource] = useState(gameSrc);

  // downloads game as an html file
  function downloadGame() {
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(source)}`;
    link.click();
  }

  // focuses on screen
  function focus() {
    screenRef.current.focus();
  }

  // reset source when cleared
  useEffect(() => {
    if (source === null) {
      setSource(gameSrc);
      focus();
    }
  }, [source]);

  // focus frame on start
  useEffect(() => {
    focus();
  }, []);

  return (
    <div className={styles.container}>
      <iframe
        ref={screenRef}
        className={styles.screen}
        title="game"
        sandbox="allow-scripts"
        srcDoc={source}
        width={mapPixels}
        height={mapPixels}
        frameBorder="0"
      />
      <div className={styles.toolbar}>
        <Button
          className="circlebutton"
          variant="contained"
          onClick={() => setSource(null)}
        >
          <ReplayIcon />
        </Button>
        {
          props.download &&
          <Button
            className="circlebutton"
            variant="contained"
            onClick={downloadGame}
          >
            <GetAppIcon />
          </Button>
        }
      </div>
    </div>
  );
}
