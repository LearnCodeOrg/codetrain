import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

import styles from '../styles/Frame.module.css';

export default function Frame(props) {
  const {
    mapPixels, spriteSize, spritePixels, pixelPixels,
    mapSize, codes, colors, sprites, background, objects
  } = props;

  // returns function definition for given object
  function getCodeFunction(spriteIndex, mapIndex) {
    // return empty if no object
    if (spriteIndex === -1) return '';
    return (
`(function() {
  let mapIndex = ${mapIndex};
  const spriteIndex = ${spriteIndex};
  function move(dir) {
    if (dir === 'left') {
      if (mapIndex % mapSize === 0) return;
      const newIndex = mapIndex - 1;
      if (objects[newIndex] !== -1) return;
      objects[newIndex] = spriteIndex;
      objects[mapIndex] = -1;
      mapIndex = newIndex;
    } else if (dir === 'right') {
      if (mapIndex % mapSize === mapSize - 1) return;
      const newIndex = mapIndex + 1;
      if (objects[newIndex] !== -1) return;
      objects[newIndex] = spriteIndex;
      objects[mapIndex] = -1;
      mapIndex = newIndex;
    } else if (dir === 'up') {
      if (mapIndex < mapSize) return;
      const newIndex = mapIndex - mapSize;
      if (objects[newIndex] !== -1) return;
      objects[newIndex] = spriteIndex;
      objects[mapIndex] = -1;
      mapIndex = newIndex;
    } else if (dir === 'down') {
      if (mapIndex >= mapSize * mapSize - mapSize) return;
      const newIndex = mapIndex + mapSize;
      if (objects[newIndex] !== -1) return;
      objects[newIndex] = spriteIndex;
      objects[mapIndex] = -1;
      mapIndex = newIndex;
    }
  }
  ${codes[spriteIndex]}
  return {
    start: typeof start === 'function' ? start : () => {},
    update: typeof update === 'function' ? update : () => {}
  };
})(),`);
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
    const colors = ${JSON.stringify(colors)};
    const sprites = ${JSON.stringify(sprites)};
    const background = ${JSON.stringify(background)};
    const objects = ${JSON.stringify(objects)};
    let lastPressedKeys = {};
    const pressedKeys = {};
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
      ${objects.map((object, mapIndex) =>
        getCodeFunction(object, mapIndex)
      ).join('')}
    ];
    // runs after body has loaded
    function __start__() {
      // variable declarations
      let canvas, ctx;
      const spriteSize = ${spriteSize};
      const spritePixels = ${spritePixels};
      const pixelPixels = ${pixelPixels};
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
            let xm = x * spritePixels + xp * pixelPixels;
            let ym = y * spritePixels + yp * pixelPixels;
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
            const mapIndex = y * mapSize + x;
            const sprite = objects[mapIndex] === -1 ?
            sprites[background[mapIndex]] : sprites[objects[mapIndex]];
            // draw sprite
            drawSprite(sprite, x, y);
          }
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
    <>
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
    </>
  );
}
