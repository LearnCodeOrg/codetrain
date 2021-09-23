import GetAppIcon from '@material-ui/icons/GetApp';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';

import { useEffect, useState } from 'react';

import styles from '../styles/components/GameFrame.module.css';

export default function GameFrame(props) {
  const {
    mapPixels, spriteSize, spritePixels, pixelPixels,
    mapSize, codes, colors, tiles, objects, background, gameObjects
  } = props;

  // returns function definition for given object
  function getCodeFunction(gameObject, index) {
    const { x, y, sprite } = gameObject;
    return (
`(function() {
  const index = ${index};
  const move = dir => __move__(index, dir);
  const movePixels = (x, y) => __movePixels__(index, x, y);
  const moveTiles = (x, y) => __moveTiles__(index, x, y);
  const moveToPixel = (x, y) => __moveToPixel__(index, x, y);
  const moveToTile = (x, y) => __moveToTile__(index, x, y);
  const getPixelPosition = () => __getPixelPosition__(index);
  const getTilePosition = () => __getTilePosition__(index);
  const getTile = () => __getTile__(index);
  const setTile = tile => __setTile__(index, tile);
  const getTileAt = (x, y) => background[y * mapSize + x];
  const setTileAt = (x, y, tile) => { background[y * mapSize + x] = tile; }
  const say = text => { dialogue = \`\${text}\`; }
  ${codes[sprite]}
  return {
    start: typeof start === 'function' ? start : () => {},
    update: typeof update === 'function' ? update : () => {}
  };
})()`);
  }

  const gameSrc =
`<html>
  <body onload="__start__()">
    <canvas
      id="canvas-game"
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
  </style>
  <script>
    // variable declarations
    let dialogue;
    const mapSize = ${mapSize};
    const mapPixels = ${mapPixels};
    const spriteSize = ${spriteSize};
    const spritePixels = ${spritePixels};
    const pixelPixels = ${pixelPixels};
    const colors = ${JSON.stringify(colors)};
    const tiles = ${JSON.stringify(tiles)};
    const objects = ${JSON.stringify(objects)};
    const background = ${JSON.stringify(background)};
    const gameObjects = ${JSON.stringify(gameObjects)};
    let lastPressedKeys = {};
    const pressedKeys = {};
    // sprite functions
    function sleep(sec) {
      return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }
    function range(num) {
      return [...Array(num).keys()];
    }
    function __move__(index, dir) {
      if (dir === 'up') gameObjects[index].y -= spritePixels;
      else if (dir === 'down') gameObjects[index].y += spritePixels;
      else if (dir === 'left') gameObjects[index].x -= spritePixels;
      else if (dir === 'right') gameObjects[index].x += spritePixels;
    }
    function __movePixels__(index, x, y) {
      gameObjects[index].x += x * pixelPixels;
      gameObjects[index].y += y * pixelPixels;
    }
    function __moveTiles__(index, x, y) {
      gameObjects[index].x += x * spritePixels;
      gameObjects[index].y += y * spritePixels;
    }
    function __moveToPixel__(index, x, y) {
      gameObjects[index].x = x * pixelPixels;
      gameObjects[index].y = y * pixelPixels;
    }
    function __moveToTile__(index, x, y) {
      gameObjects[index].x = x * spritePixels;
      gameObjects[index].y = y * spritePixels;
    }
    function __getPixelPosition__(index) {
      return {
        x: Math.floor(gameObjects[index].x / pixelPixels),
        y: Math.floor(gameObjects[index].y / pixelPixels)
      };
    }
    function __getTilePosition__(index) {
      return {
        x: Math.floor(gameObjects[index].x / spritePixels),
        y: Math.floor(gameObjects[index].y / spritePixels)
      };
    }
    function __getTile__(index) {
      const position = __getTilePosition__(index);
      const tileIndex = position.y * mapSize + position.x;
      return background[tileIndex];
    }
    function __setTile__(index, tile) {
      const position = __getTilePosition__(index);
      const tileIndex = position.y * mapSize + position.x;
      background[tileIndex] = tile;
    }
    // set up input listeners
    window.onkeydown = e => {
      pressedKeys[e.keyCode] = true;
      dialogue = undefined;
    }
    window.onkeyup = e => pressedKeys[e.keyCode] = false;
    window.onmousedown = e => { dialogue = undefined; }
    function isKeyDown(key) {
      // handle invalid key
      if (typeof key !== 'string' || !key.length) return undefined;
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return pressedKeys[keyCode];
    }
    function isKey(key) {
      // handle invalid key
      if (typeof key !== 'string' || !key.length) return undefined;
      // handle key code
      const keyCode = key.toUpperCase().charCodeAt(0);
      return pressedKeys[keyCode] && !lastPressedKeys[keyCode];
    }
    // sprite codes
    const spriteCodes = [
      ${gameObjects.map((gameObject, index) =>
        getCodeFunction(gameObject, index)
      ).join(',\n')}
    ];
    // runs after body has loaded
    function __start__() {
      // variable declarations
      let canvas, ctx;
      // canvas functions
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
      function draw() {
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
        // for each object
        for (const object of gameObjects) {
          // draw object
          const { x, y } = object;
          const sprite = objects[object.sprite];
          drawSprite(sprite, x, y);
        }
        // draw dialogue text
        if (dialogue) {
          const left = mapPixels / 8;
          const top = mapPixels * 3 / 8;
          const offset = 8;
          const width = mapPixels * 3 / 4 + offset * 2;
          const height = mapPixels / 4 + offset * 2;
          ctx.fillStyle = '#fff';
          ctx.fillRect(left - offset, top - offset, width, height);
          ctx.fillStyle = '#000';
          const fontSize = 16;
          const lineSize = 20;
          ctx.font = \`\${fontSize}px monospace\`;
          const line1 = dialogue.slice(0, lineSize);
          const line2 = dialogue.slice(lineSize, lineSize * 2);
          const line3 = dialogue.slice(lineSize * 2, lineSize * 3);
          const line4 = dialogue.slice(lineSize * 3, lineSize * 4);
          ctx.fillText(line1, left, top + fontSize);
          ctx.fillText(line2, left, top + fontSize * 2);
          ctx.fillText(line3, left, top + fontSize * 3);
          ctx.fillText(line4, left, top + fontSize * 4);
        }
      }
      // game loop
      function gameLoop(time) {
        // run update functions
        spriteCodes.forEach(code => code.update());
        // draw
        draw();
        // update keys
        lastPressedKeys = Object.assign({}, pressedKeys);
        // continue loop
        requestAnimationFrame(gameLoop);
      }
      // get canvas and context
      canvas = document.getElementById('canvas-game');
      ctx = canvas.getContext('2d');
      // run start functions
      spriteCodes.forEach(code => code.start());
      // start game loop
      requestAnimationFrame(gameLoop);
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

  // reset source when cleared
  useEffect(() => {
    if (source === null) setSource(gameSrc);
  }, [source]);

  return (
    <div className={styles.container}>
      <iframe
        className={styles.screen}
        title="game"
        sandbox="allow-scripts"
        srcDoc={source}
        width={mapPixels}
        height={mapPixels}
        frameBorder="0"
      />
      <div className={styles.toolbar}>
        <button onClick={() => setSource(null)}>
          <ReplayIcon />
        </button>
        {
          props.download &&
          <button onClick={downloadGame}>
            <GetAppIcon />
          </button>
        }
      </div>
    </div>
  );
}
