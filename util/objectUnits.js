// returns given gameobjects with units inserted
export function insertObjectUnits(gameObjects, pixelPixels) {
  return gameObjects.map(obj => ({
    sprite: obj.sprite,
    x: obj.x * pixelPixels,
    y: obj.y * pixelPixels
  }));
}

// returns given gameobjects with units removed
export function removeObjectUnits(gameObjects, pixelPixels) {
  return gameObjects.map(obj => ({
    sprite: obj.sprite,
    x: Math.round(obj.x / pixelPixels),
    y: Math.round(obj.y / pixelPixels)
  }));
}
