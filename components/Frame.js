import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

import styles from '../styles/Frame.module.css';

export default function Frame(props) {
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
    // set up key listeners
    window.onkeydown = e => pressedKeys[e.keyCode] = true;
    window.onkeyup = e => pressedKeys[e.keyCode] = false;
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

  // downloads game as an html file
  function downloadGame() {
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(gameSrc)}`;
    link.click();
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={downloadGame}
      >
        <GetAppIcon />
      </Button>
      <iframe
        title="game"
        sandbox="allow-scripts"
        srcDoc={gameSrc}
        width={mapPixels}
        height={mapPixels}
        frameBorder="0"
      />
    </div>
  );
}
