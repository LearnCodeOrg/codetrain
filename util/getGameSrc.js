export default function getGameSrc(props) {
  const {
    mapSize, spriteSize, mapPixels, spritePixels, pixelPixels,
    objectNames, tileNames, objects, tiles,
    codes, colors, gameObjects, background
  } = props;

  return (
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
      'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
      monospace;
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
    objectNames: ${JSON.stringify(objectNames)},
    tileNames: ${JSON.stringify(tileNames)},
    colors: ${JSON.stringify(colors)},
    tiles: ${JSON.stringify(tiles)},
    objects: ${JSON.stringify(objects)},
    codes: ${JSON.stringify(codes)},
    background: ${JSON.stringify(background)},
    gameObjects: ${JSON.stringify(gameObjects)},
    lastPressedKeys: {},
    pressedKeys: {},
    sounds: {},
    texts: {},
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
      const mapIndex = pos.y * $$.mapSize + pos.x;
      const nameIndex = $$.background[mapIndex];
      return $$.tileNames[nameIndex] ?? null;
    },
    setTile: (index, tile) => {
      const pos = $$.getTilePos(index);
      const mapIndex = pos.y * $$.mapSize + pos.x;
      const nameIndex = $$.tileNames.indexOf(tile);
      if (nameIndex === -1) {
        throw new ReferenceError(\`\${tile} is not a valid tile\`);
      }
      $$.background[mapIndex] = nameIndex;
    },
    getTileAt: (x, y) => {
      const mapIndex = y * $$.mapSize + x;
      const nameIndex = $$.background[mapIndex];
      return $$.tileNames[nameIndex] ?? null;
    },
    setTileAt: (x, y, tile) => {
      const mapIndex = y * $$.mapSize + x;
      const nameIndex = $$.tileNames.indexOf(tile);
      if (nameIndex === -1) {
        throw new ReferenceError(\`\${tile} is not a valid tile\`);
      }
      $$.background[mapIndex] = nameIndex;
    },
    getObject: (id) => {
      return $$.spriteCodes.find(obj => obj.id === id) ?? null;
    },
    deleteObject: (id) => {
      // get object index
      const objectIndex = $$.gameObjects.findIndex(obj => obj.id === id);
      if (objectIndex === -1) {
        throw new ReferenceError(\`No object found with ID \${id}\`);
      }
      // splice object
      $$.gameObjects.splice(objectIndex, 1);
      $$.spriteCodes.splice(objectIndex, 1);
      // update object indices
      $$.spriteCodes.forEach((code, i) => $$.spriteCodes[i].$$setIndex(i));
      console.log($$.spriteCodes);
    },
    createObject: (object, x, y, id) => {
      // get sprite
      const sprite = $$.objectNames.indexOf(object);
      if (sprite === -1) {
        throw new ReferenceError(\`No sprite found with name \${object}\`);
      }
      // push object
      const gameObject = {
        id: id ?? $$.shortid(),
        x: x * $$.pixelPixels,
        y: y * $$.pixelPixels,
        sprite
      };
      $$.gameObjects.push(gameObject);
      // initialize object code
      const index = $$.gameObjects.length - 1;
      const code = $$.getCodeFunction(gameObject, index);
      code.start();
      $$.spriteCodes.push(code);
      // return created object
      return code;
    },
    addSound: (name, url) => {
      const audio = document.createElement('audio');
      audio.src = url;
      $$.sounds[name] = audio;
    },
    playSound: (name) => {
      const sound = $$.sounds[name];
      if (!sound) {
        throw new ReferenceError(\`No sound found with name \${name}\`);
      }
      sound.play();
    },
    addText: (text, x, y, id) => {
      const textId = id ?? $$.shortid();
      $$.texts[textId] = { text, x, y, id: textId };
      return $$.texts[textId];
    },
    removeText: (id) => {
      if (!$$.texts[id]) {
        throw new ReferenceError(\`No text found with ID \${id}\`);
      }
      delete $$.texts[id];
    },
    shortid: () => {
      if (!crypto || !crypto.randomUUID) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        let id = '';
        for (let i = 0; i < 6; i++) {
          const randIndex = Math.floor(Math.random() * chars.length);
          id += chars[randIndex];
        }
        return id;
      }
      return crypto.randomUUID().slice(0, 6);
    },
    throwError: (error) => {
      // clear canvas
      $$.ctx.fillStyle = '#fff';
      $$.ctx.fillRect(0, 0, $$.mapPixels, $$.mapPixels);
      // create error text
      const p = document.createElement('p');
      p.className = 'error';
      p.innerText = error.stack;
      document.body.appendChild(p);
    },
    getCodeFunction: (gameObject, index) => {
      return (
        (function() {
          let $$index = index;
          const move = dir => $$.move($$index, dir);
          const movePixels = (x, y) => $$.movePixels($$index, x, y);
          const moveTiles = (x, y) => $$.moveTiles($$index, x, y);
          const setPixelPos = (x, y) => $$.setPixelPos($$index, x, y);
          const setTilePos = (x, y) => $$.setTilePos($$index, x, y);
          const getPixelPos = () => $$.getPixelPos($$index);
          const getTilePos = () => $$.getTilePos($$index);
          const getTile = () => $$.getTile($$index);
          const setTile = tile => $$.setTile($$index, tile);
          const getTileAt = $$.getTileAt;
          const setTileAt = $$.setTileAt;
          const say = text => { $$.dialogue = \`\${text}\`; }
          const getObject = $$.getObject;
          const deleteObject = $$.deleteObject;
          const createObject = $$.createObject;
          const addSound = $$.addSound;
          const playSound = $$.playSound;
          const addText = $$.addText;
          const removeText = $$.removeText;
          eval($$.codes[gameObject.sprite]);
          return {
            id: gameObject.id,
            move, movePixels, moveTiles, getTile, setTile,
            setPixelPos, setTilePos, getPixelPos, getTilePos,
            start: typeof start === 'function' ? start : () => {},
            update: typeof update === 'function' ? update : () => {},
            $$setIndex: (newIndex) => { $$index = newIndex; }
          };
        })()
      );
    }
  }
  // set up input listeners
  window.onkeydown = e => {
    const keyName = e.key.toLowerCase();
    $$.pressedKeys[keyName] = true;
    $$.dialogue = undefined;
  }
  window.onkeyup = e => {
    const keyName = e.key.toLowerCase();
    $$.pressedKeys[keyName] = false;
  }
  window.onmousedown = e => { $$.dialogue = undefined; }
  function isKeyDown(key) {
    // handle invalid key
    if (typeof key !== 'string' || !key.length) {
      throw new TypeError(\`Invalid key \${key}\`);
    }
    // handle key name
    const keyName = key.toLowerCase();
    return $$.pressedKeys[keyName];
  }
  function isKey(key) {
    // handle invalid key
    if (typeof key !== 'string' || !key.length) {
      throw new TypeError(\`Invalid key \${key}\`);
    }
    // handle key name
    const keyName = key.toLowerCase();
    return $$.pressedKeys[keyName] && !$$.lastPressedKeys[keyName];
  }
  // runs after body has loaded
  function __start__() {
    // canvas functions
    function drawSprite(sprite, x, y) {
      // for each pixel
      for (let yp = 0; yp < $$.spriteSize; yp++) {
        for (let xp = 0; xp < $$.spriteSize; xp++) {
          // set fill color
          const spriteIndex = yp * $$.spriteSize + xp;
          const colorIndex = sprite[spriteIndex];
          if (colorIndex === -1) continue;
          const color = $$.colors[colorIndex];
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
      $$.spriteCodes = $$.gameObjects.map((gameObject, index) =>
        $$.getCodeFunction(gameObject, index)
      );
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
`
  );
}
