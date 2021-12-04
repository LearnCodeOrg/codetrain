import { defaultColors } from './palettes';

// units
export const tileCount = 16;
export const objectCount = 16;
export const spriteSize = 8;
export const mapSize = 8;

// defaults
const defaultCode =
`// called once when the game starts
function start() {

}

// called every frame
function update() {

}
`;
const playerCode =
`// called once when the game starts
function start() {

}

// called every frame
function update() {
  if (isKey('w')) move('up');
  if (isKey('a')) move('left');
  if (isKey('s')) move('down');
  if (isKey('d')) move('right');
}
`;
const playerObject = [
  -1, 0, 2, 2, 2, -1, 2, -1,
  -1, 2, 2, 2, 2, -1, 2, -1,
  -1, 1, 3, 1, 3, -1, 2, -1,
  -1, 1, 1, 1, 1, -1, 2, -1,
  2, 2, 2, 2, 2, 3, 3, 3,
  1, 2, 2, 2, 2, 1, 1, -1,
  1, 2, 2, 2, 2, -1, 2, -1,
  -1, 3, -1, -1, 3, -1, -1, -1
];
const defaultObject = [
  -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, 3, 3, 3, 3, -1, -1,
  -1, -1, 3, 3, 3, 3, -1, -1,
  -1, -1, 3, 3, 3, 3, -1, -1,
  -1, -1, 3, 3, 3, 3, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1
];
const grassTile = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 0,
  0, 1, 0, 0, 0, 1, 0, 1,
  0, 1, 0, 1, 0, 1, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0
];
const defaultTile = Array(spriteSize * spriteSize).fill(0);
const codes = Array(objectCount).fill(0).map((val, i) => (
  i === 0 ? playerCode : defaultCode
));
const objectNames = Array(objectCount).fill(0).map((val, i) => (
  i === 0 ? 'player' : `object ${i}`
));
const tileNames = Array(objectCount).fill(0).map((val, i) => (
  i === 0 ? 'empty' : i === 1 ? 'grass' : `tile ${i}`
));
const colors = defaultColors;
const tiles = Array(tileCount).fill(0).map((val, i) => (
  i === 1 ? grassTile : defaultTile
));
const objects = Array(objectCount).fill(0).map((val, i) => (
  i === 0 ? playerObject : defaultObject
));
const background = [
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 1, 1, 1, 0,
  1, 0, 0, 1, 1, 1, 0, 0,
  1, 0, 0, 1, 0, 0, 0, 1,
  1, 1, 0, 0, 0, 0, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 0
];

// default tile names if none given
export const defaultTileNames = Array(objectCount)
  .fill(0).map((val, i) => (`tile ${i}`));

// default data
export const defaultData = {
  codes, colors, background, objectNames, tileNames,
  gameObjects: [{ id: objectNames[0].toLowerCase(), sprite: 0, x: 0, y: 0 }],
  title: 'My First Project', description: 'WASD to move.',
  tiles: JSON.stringify(tiles), objects: JSON.stringify(objects)
};
