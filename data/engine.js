import { palettes } from './palettes';

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
const defaultSprite = Array(spriteSize * spriteSize).fill(0);
const codes = Array(objectCount).fill(defaultCode);
const objectNames = Array(objectCount).fill(0).map((val, i) => `Object ${i}`);
const colors = palettes[0].colors;
const tiles = Array(tileCount).fill(defaultSprite);
const objects = Array(objectCount).fill(defaultSprite);
const background = Array(mapSize * mapSize).fill(0);

// default data
export const defaultData = {
  codes, colors, background, gameObjects: [], title: '', description: '',
  objectNames, tiles: JSON.stringify(tiles), objects: JSON.stringify(objects)
};
