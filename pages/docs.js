export default function Docs() {
  return (
    <div>
      <h1>Game Loop</h1>
      start(): runs once at the start of the game<br />
      update(): runs once a frame
      <h1>Input</h1>
      isKeyDown(key): returns whether given key is pressed<br />
      isKey(key): returns whether given key was pressed in the last frame
      Output
      say(text): opens a dialogue box with given text closable with left click
      <h1>Movement</h1>
      move(dir): moves object one tile up, down, left, or right<br />
      moveTiles(x, y): moves object by x, y in tiles<br />
      movePixels(x, y): moves object by x, y in pixels<br />
      getTilePosition(): returns an object containing x, y position in tiles<br />
      getPixelPosition(): returns an object containing x, y position in pixels
      <h1>Tiles</h1>
      getTile(): returns index of tile at position<br />
      setTile(tile): sets tile at position to index tile<br />
      getTileAt(x, y): returns index of tile at x, y<br />
      setTileAt(x, y, tile): sets tile at x, y to index tile
      <h1>Utility</h1>
      range(num): returns an array containing numbers up to num<br />
      sleep(sec): returns a promise expiring in sec seconds
      <h1>Variables</h1>
      colors: array of color data<br />
      tiles: array of tile sprite data<br />
      objects: array of object sprite data<br />
      background: array of active tile indexes<br />
      gameObjects: array of active objects
      <h1>Constants</h1>
      mapSize: map size in tiles<br />
      mapPixels: map size in pixels<br />
      spriteSize: sprite size in sprite pixels<br />
      spritePixels: sprite size in pixels<br />
      pixelPixels: sprite pixel size in pixels
    </div>
  )
}
