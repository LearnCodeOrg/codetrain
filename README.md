# Codetrain

An educational browser game engine.

Try it here: [codetrain.org](https://codetrain.org)

## Game Loop

`start()`: runs once at the start of the game

`update()`: runs once a frame

## Input

`isKeyDown(key)`: returns whether given `key` is pressed

`isKey(key)`: returns whether given `key` was pressed in the last frame

## Output

`say(text)`: opens a dialogue box with given `text` closable with left click

## Movement

`move(dir)`: moves object one tile `up`, `down`, `left`, or `right`

`moveTiles(x, y)`: moves object by `x`, `y` in tiles

`movePixels(x, y)`: moves object by `x`, `y` in pixels

`getTilePosition()`: returns an object containing `x`, `y` position in tiles

`getPixelPosition()`: returns an object containing `x`, `y` position in pixels

## Tiles

`getTile()`: returns index of tile at position

`setTile(tile)`: sets tile at position to index `tile`

`getTileAt(x, y)`: returns index of tile at `x`, `y`

`setTileAt(x, y, tile)`: sets tile at `x`, `y` to index `tile`

## Utility

`range(num)`: returns an array containing numbers up to `num`

`sleep(sec)`: returns a promise expiring in `sec` seconds

## Variables

`colors`: array of color data

`tiles`: array of tile sprite data

`objects`: array of object sprite data

`background`: array of active tile indexes

`gameObjects`: array of active objects

## Constants

`mapSize`: map size in tiles

`mapPixels`: map size in pixels

`spriteSize`: sprite size in sprite pixels

`spritePixels`: sprite size in pixels

`pixelPixels`: sprite pixel size in pixels

# Examples

```js
// open dialogue box
function start() {
  say('Hello World!');
}
```

```js
// looping and moving
function start() {
  for (i in range(3)) move('right');
}
```

```js
// tiled object movement
function update() {
  if (isKey('w')) move('up');
  if (isKey('a')) move('left');
  if (isKey('s')) move('down');
  if (isKey('d')) move('right');
}
```

```js
// smooth object movement
function update() {
  if (isKeyDown('w')) movePixels(0, -1);
  if (isKeyDown('a')) movePixels(-1, 0);
  if (isKeyDown('s')) movePixels(0, 1);
  if (isKeyDown('d')) movePixels(1, 0);
}
```

```js
// movement animation
async function animate() {
  await sleep(1);
  move('right');
  await sleep(1);
  move('left');
  animate();
}
function start() {
  animate();
}
```

```js
// open dialogue based on user position
let triggered = false;
function update() {
  if (!triggered) {
    const position = getTilePosition();
    if (position.x == 0 && position.y == 0) {
      say('Hello!');
      triggered = true;
    }
  }
}
```

```js
// movement painting
function paint(dir) {
  const tile = getTile();
  if (tile === tiles.length - 1) setTile(0);
  else setTile(tile + 1);
  move(dir);
}
function update() {
  if (isKey('w')) paint('up');
  if (isKey('a')) paint('left');
  if (isKey('s')) paint('down');
  if (isKey('d')) paint('right');
}
```
