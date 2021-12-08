import { shortid } from './uuid';

// returns given gameobjects with units inserted
export function insertObjectUnits(gameObjects, pixelPixels) {
  return gameObjects.map(obj => {
    const { x, y, id, ...data } = obj;
    return {
      id: id ?? shortid(),
      x: x * pixelPixels,
      y: y * pixelPixels,
      ...data
    };
  });
}

// returns given gameobjects with units removed
export function removeObjectUnits(gameObjects, pixelPixels) {
  return gameObjects.map(obj => {
    const { id, x, y, ...data } = obj;
    return {
      id: id ?? shortid(),
      x: Math.round(x / pixelPixels),
      y: Math.round(y / pixelPixels),
      ...obj
    };
  });
}
