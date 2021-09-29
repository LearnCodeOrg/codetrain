import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
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
          <a href="#gameloop">
            <ListItem button>
              <ListItemText primary="Game Loop" />
            </ListItem>
          </a>
          <a href="#input">
            <ListItem button>
              <ListItemText primary="Input" />
            </ListItem>
          </a>
          <a href="#output">
            <ListItem button>
              <ListItemText primary="Output" />
            </ListItem>
          </a>
          <a href="#movement">
            <ListItem button>
              <ListItemText primary="Movement" />
            </ListItem>
          </a>
          <a href="#tiles">
            <ListItem button>
              <ListItemText primary="Tiles" />
            </ListItem>
          </a>
        </List>
      </Drawer>
      <div className={styles.content}>
        <h1>Docs</h1>
        <h2 id="gameloop">Game Loop</h2>
        There are two built-in game loop functions, <code>start()</code> and
        {' '}<code>update()</code>.<br /><br />
        <code>start()</code> runs once at the start of the game.<br />
        <code>update()</code> runs once a frame.
        <Code>
{`let frames = 0;

function start() {
  console.log(frames); // runs before update, logs 0
}

function update() {
  frames += 1;
}`}
        </Code>
        <h2 id="output">Output</h2>
        A dialogue box can be opened with <code>say(text)</code>.<br />
        <Code>
{`say('Hello World!');`}
        </Code>
        <h2 id="input">Input</h2>
        Keyboard input can be taken with <code>isKeyDown(key)</code> and{' '}
        <code>isKey(key)</code>.<br /><br />
        <code>isKeyDown(key)</code> returns whether given <code>key</code> is
        {' '}down.<br />
        <code>isKey(key)</code> returns whether given <code>key</code> was
        {' '}pressed in the last frame.
        <Code>
{`function update() {
  if (isKey('q')) say('Q pressed'); // triggers once
  if (isKeyDown('q')) console.log('Q down'); // triggers continually
}
`}
        </Code>
        <h2 id="movement">Movement</h2>
        Objects can be moved with <code>move(dir)</code>,
        {' '}<code>moveTiles(x, y)</code>, and <code>movePixels(x, y)</code>.
        <br /><br />
        <code>move(dir)</code> moves object one tile <code>up</code>,{' '}
        <code>down</code>, <code>left</code>, or <code>right</code>.<br />
        <code>moveTiles(x, y)</code> moves object by <code>x</code>,{' '}
        <code>y</code>, in tiles.<br />
        <code>movePixels(x, y)</code> moves object by <code>x</code>,{' '}
        <code>y</code>, in pixels.
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
        Object position can be found with <code>getTilePosition()</code> and
        {' '}<code>getPixelPosition()</code>.<br /><br />
        <code>getTilePosition()</code> returns <code>x</code>, <code>y</code>
        {' '}position in tiles.<br />
        <code>getPixelPosition()</code> returns <code>x</code>, <code>y</code>
        {' '}position in pixels.
        <Code>
{`const pos = getTilePosition();

say(\`Object is at \${x}, \${y}\`);`}
        </Code>
        <h2 id="tiles">Tiles</h2>
        Tiles can be retrieved with <code>getTile()</code> and
        {' '}<code>getTileAt(x, y, tile)</code>.<br /><br />
        <code>getTile()</code> returns index of tile at current position.<br />
        <code>getTileAt(x, y)</code> returns index of tile at <code>x</code>,
        {' '}<code>y</code>.
        <Code>
{`const tile = getTile();

say(\`Object is on tile \${tile}\`);
`}
        </Code>
        Tiles can be modified with <code>setTile(tile)</code> and
        {' '}<code>setTileAt(x, y, tile)</code>.<br /><br />
        <code>setTile(tile)</code> returns index of tile at current position.<br />
        <code>setTileAt(x, y, tile)</code> sets tile at <code>x</code>,
        {' '}<code>y</code> to index <code>tile</code>.
        <Code>
{`const tile = getTile();

// toggle tile at position
if (tile === 0) setTile(1);
else setTile(0);
`}
        </Code>
      </div>
    </div>
  )
}
