import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

import styles from '../styles/pages/Docs.module.css';

function Code(props) {
  return (
    <pre>
      <code className="language-javascript">
        {props.children}
      </code>
    </pre>
  );
}

export default function Docs() {
  // initialize hljs on start
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, []);

  return (
    <div className={styles.container}>
      <Drawer
        sx={{
          width: 256,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 256,
            boxSizing: 'border-box',
            top: 60,
            zIndex: 0
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
        </List>
      </Drawer>
      <div>
        <h1>Docs</h1>
        <h2 id="gameloop">Game Loop</h2>
        <Code>
{`// called once when the game starts
function start() {}

// called every frame
function update() {}
`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`let frames = 0;

function start() {
  console.log(frames); // 0
}

function update() {
  frames += 1;
}`}
        </Code>
        <h2 id="input">Input</h2>
        <Code>
{`isKeyDown(key); // returns whether given key is pressed

isKey(key); // returns whether given key was pressed in the last frame
`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`// tiled object movement
function update() {
  if (isKey('w')) move('up');
  if (isKey('a')) move('left');
  if (isKey('s')) move('down');
  if (isKey('d')) move('right');
}
`}
        </Code>
        <Code>
{`// smooth object movement
function update() {
  if (isKeyDown('w')) movePixels(0, -1);
  if (isKeyDown('a')) movePixels(-1, 0);
  if (isKeyDown('s')) movePixels(0, 1);
  if (isKeyDown('d')) movePixels(1, 0);
}`}
        </Code>
        <h2 id="output">Output</h2>
        <Code>
{`say(text); // opens a closable dialogue box with given text`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`// open dialogue box on start
function start() {
  say('Hello World!');
}`}
        </Code>
        <h2 id="movement">Movement</h2>
        <Code>
{`move(dir); // moves object one tile up, down, left, or right

moveTiles(x, y); // moves object by x, y in tiles

movePixels(x, y); // moves object by x, y in pixels

getTilePosition(); // returns x, y position in tiles

getPixelPosition(); // returns x, y position in pixels`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`// tiled object movement
function update() {
  if (isKey('w')) move('up');
  if (isKey('a')) move('left');
  if (isKey('s')) move('down');
  if (isKey('d')) move('right');
}
`}
        </Code>
        <Code>
{`// smooth object movement
function update() {
  if (isKeyDown('w')) movePixels(0, -1);
  if (isKeyDown('a')) movePixels(-1, 0);
  if (isKeyDown('s')) movePixels(0, 1);
  if (isKeyDown('d')) movePixels(1, 0);
}`}
        </Code>
        <h2 id="tiles">Tiles</h2>
        <Code>
{`getTile(); // returns index of tile at position

setTile(tile); // sets tile at position to index tile

getTileAt(x, y); // returns index of tile at x, y

setTileAt(x, y, tile); // sets tile at x, y to index tile`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`// movement painting
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
}`}
        </Code>
        <h2 id="utility">Utility</h2>
        <Code>
{`range(num); // returns an array containing numbers up to num

sleep(sec); // returns a promise expiring in sec seconds`}
        </Code>
        <h3>Examples</h3>
        <Code>
{`// movement animation
async function animate() {
  await sleep(1);
  move('right');
  await sleep(1);
  move('left');
  animate();
}

function start() {
  animate();
}`}
        </Code>
      </div>
    </div>
  )
}
