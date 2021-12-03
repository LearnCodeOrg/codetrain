import Header from '../components/Header';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DescriptionIcon from '@mui/icons-material/Description';
import LoopIcon from '@mui/icons-material/Loop';
import TextsmsIcon from '@mui/icons-material/Textsms';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import GridOnIcon from '@mui/icons-material/GridOn';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LinkIcon from '@mui/icons-material/Link';

import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

import styles from '../styles/pages/Docs.module.css';

function Code(props) {
  return (
    <pre>
      {/* eslint-disable-next-line */}
      <code className="language-javascript">
        {props.children}
      </code>
    </pre>
  );
}

export default function Docs(props) {
  // initialize hljs on start
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, []);

  return (
    <div className={styles.container}>
      <Header {...props} />
      <div className={styles.main}>
        <Drawer
          sx={{
            width: 256,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 256,
              boxSizing: 'border-box',
              background: 'var(--gray)',
              color: 'var(--black)',
              top: 60,
              zIndex: 0
            },
            '& .MuiDrawer-paper > ul > a:hover': {
              color: 'var(--highlight)'
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            <a href="#gameloop">
              <ListItem button>
                <LoopIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Game Loop" />
              </ListItem>
            </a>
            <a href="#output">
              <ListItem button>
                <TextsmsIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Output" />
              </ListItem>
            </a>
            <a href="#input">
              <ListItem button>
                <KeyboardIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Input" />
              </ListItem>
            </a>
            <a href="#movement">
              <ListItem button>
                <DoubleArrowIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Movement" />
              </ListItem>
            </a>
            <a href="#tiles">
              <ListItem button>
                <GridOnIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Tiles" />
              </ListItem>
            </a>
            <a href="#objects">
              <ListItem button>
                <AccessibilityIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Objects" />
              </ListItem>
            </a>
          </List>
        </Drawer>
        <div className={styles.content}>
          <h1><DescriptionIcon fontSize="large" />Docs</h1>
          These docs provide an overview of the Codetrain engine functionality.
          <hr />
          <div id="gameloop" className={styles.bookmark} />
          <h2>
            <LoopIcon />
            Game Loop
            <a href="#gameloop">
              <LinkIcon />
            </a>
          </h2>
          There are two built-in game loop functions, <code>start()</code> and
          {' '}<code>update()</code>.<br /><br />
          <code>start()</code> runs once at the start of the game.<br />
          <code>update()</code> runs once a frame.
          <Code>
{`// code here runs first

function start() {
  // code here runs second
}

function update() {
  // code here runs last
  // code here runs every frame
}`}
          </Code>
          <hr />
          <div id="output" className={styles.bookmark} />
          <h2>
            <TextsmsIcon />
            Output
            <a href="#output">
              <LinkIcon />
            </a>
          </h2>
          Text can be displayed with <code>say(text)</code>.<br /><br />
          <code>say(text)</code> opens a dialogue box with given{' '}
          <code>text</code>.
          <Code>
{`// open dialogue box saying 'Hello World!'
say('Hello World!');`}
          </Code>
          <hr />
          <div id="input" className={styles.bookmark} />
          <h2>
            <KeyboardIcon />
            Input
            <a href="#input">
              <LinkIcon />
            </a>
          </h2>
          Keyboard input can be taken with <code>isKeyDown(key)</code> and{' '}
          <code>isKey(key)</code>.<br /><br />
          <code>isKeyDown(key)</code> returns whether given <code>key</code> is
          {' '}down.<br />
          <code>isKey(key)</code> returns whether given <code>key</code> was
          {' '}pressed in the last frame.
          <Code>
{`function update() {
  // triggers when q pressed down
  if (isKey('q')) say('Q pressed');

  // triggers while q pressed down
  if (isKeyDown('q')) console.log('Q down');
}`}
          </Code>
          <hr />
          <div id="movement" className={styles.bookmark} />
          <h2>
            <DoubleArrowIcon />
            Movement
            <a href="#movement">
              <LinkIcon />
            </a>
          </h2>
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
}`}
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
          Object position can be retrieved with <code>getTilePos()</code> and
          {' '}<code>getPixelPos()</code>.<br /><br />
          <code>getTilePos()</code> returns <code>x</code>, <code>y</code>
          {' '}position in tiles.<br />
          <code>getPixelPos()</code> returns <code>x</code>, <code>y</code>
          {' '}position in pixels.
          <Code>
{`// get tile position
const pos = getTilePos();

// if at 0, 0, open dialogue box
if (pos.x === 0 && pos.y === 0) say('At 0, 0');`}
          </Code>
          Object position can be set with <code>setTilePos(x, y)</code> and{' '}
          <code>setPixelPos(x, y)</code>.
          <br /><br />
          <code>setTilePos(x, y)</code> moves object to <code>x</code>,{' '}
          <code>y</code>, in tiles.<br />
          <code>setPixelPos(x, y)</code> moves object to <code>x</code>,{' '}
          <code>y</code>, in pixels.
          <Code>
{`function update() {
  // if q pressed, move to top left corner
  if (isKeyDown('q')) setTilePos(0, 0);

  // if z pressed, move to bottom right corner
  if (isKeyDown('z')) setTilePos(7, 7);
}`}
          </Code>
          <hr />
          <div id="tiles" className={styles.bookmark} />
          <h2>
            <GridOnIcon />
            Tiles
            <a href="#tiles">
              <LinkIcon />
            </a>
          </h2>
          Tiles can be retrieved with <code>getTile()</code> and
          {' '}<code>getTileAt(x, y, tile)</code>.<br /><br />
          <code>getTile()</code> returns index of tile at current position.<br />
          <code>getTileAt(x, y)</code> returns index of tile at <code>x</code>,
          {' '}<code>y</code>.
          <Code>
{`// get tile at position
const tile = getTile();

// if on coin, open dialogue box
if (tile === 'coin') say('You found the coin!');`}
          </Code>
          Tiles can be modified with <code>setTile(tile)</code> and
          {' '}<code>setTileAt(x, y, tile)</code>.<br /><br />
          <code>setTile(tile)</code> returns index of tile at current position.<br />
          <code>setTileAt(x, y, tile)</code> sets tile at <code>x</code>,
          {' '}<code>y</code> to index <code>tile</code>.
          <Code>
{`// get tile at position
const tile = getTile();

// if tile empty, set to grass
if (tile === 'empty') setTile('grass');`}
          </Code>
          <hr />
          <div id="objects" className={styles.bookmark} />
          <h2>
            <AccessibilityIcon />
            Objects
            <a href="#objects">
              <LinkIcon />
            </a>
          </h2>
          Objects can be retrieved with <code>getObject(id)</code>.
          <br /><br />
          <code>getObject(id)</code> returns the first reference of an{' '}
          object with given <code>id</code>.
          <Code>
{`// get object with ID 'player'
const player = getObject('player');

// move player right
player.move('right');`}
          </Code>
        </div>
      </div>
    </div>
  )
}
