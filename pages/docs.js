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
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LinkIcon from '@mui/icons-material/Link';
import BuildIcon from '@mui/icons-material/Build';

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
            <a href="#audio">
              <ListItem button>
                <VolumeUpIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Audio" />
              </ListItem>
            </a>
            <a href="#utility">
              <ListItem button>
                <BuildIcon sx={{ marginRight: 2 }} />
                <ListItemText primary="Utility" />
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
          There three built-in game loop functions, <code>awake</code>,{' '}
          <code>start</code> and <code>update</code>.<br /><br />
          <code>awake()</code> runs once at the start of the game.<br />
          <code>start()</code> runs once at the start of the game.<br />
          <code>update()</code> runs once a frame.
          <Code>
{`// runs before initialization

// runs after initialization
function awake() { }

// runs after awake
function start() { }

// runs every frame after start
function update() { }`}
          </Code>
          Elapsed time can be tracked with <code>getTime</code> and{' '}
          <code>getDeltaTime</code>.<br /><br />
          <code>getTime()</code> returns the milliseconds since{' '}
          <code>start</code> was first called.<br />
          <code>getDeltaTime()</code> returns the milliseconds since
          {' '}<code>update</code> was last called.
          <Code>
{`function update() {
  // time milliseconds have passed since first start
  const time = getTime();

  // deltaTime milliseconds have passed since last update
  const deltaTime = getDeltaTime();
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
          Dialogue can be displayed with <code>say</code>.<br /><br />
          <code>say(text)</code> opens a dialogue box with given{' '}
          <code>text</code>.
          <Code>
{`// open dialogue box saying 'Hello World!'
say('Hello World!');`}
          </Code>
          Text can be added and removed with <code>addText</code> and{' '}
          <code>removeText</code>.<br /><br />
          <code>addText(text, x, y, options?)</code> creates and returns text
          {' '}<code>text</code> at <code>x</code>, <code>y</code> pixels.
          <br />
          - <code>options</code> is an optional object containing{' '}
          <code>size</code>, <code>color</code>, and <code>id</code> fields.
          <br />
          <code>removeText(id)</code> removes text with given <code>id</code>.
          <Code>
{`// create score text
addText('Score: 0', 0, 0);

// update score text
addText('Score: 1', 0, 0);

// make score text big, red, and id 'score'
addText('Score: 1', 0, 0,
  { size: 32, color: 'red', id: 'score' }
);

// remove score text by id
removeText('score');
`}
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
          Keyboard input can be taken with <code>isKeyDown</code> and{' '}
          <code>isKey</code>.<br /><br />
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
          Objects can be moved with <code>move</code>, <code>moveTiles</code>,
          {' '}and <code>movePixels</code>.
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
          Object position can be retrieved with <code>getTilePos</code> and
          {' '}<code>getPixelPos</code>.<br /><br />
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
          Object position can be set with <code>setTilePos</code> and{' '}
          <code>setPixelPos</code>.
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
          Tiles can be retrieved with <code>getTile</code> and
          {' '}<code>getTileAt</code>.<br /><br />
          <code>getTile()</code> returns index of tile at current position.
          <br />
          <code>getTileAt(x, y)</code> returns index of tile at <code>x</code>,
          {' '}<code>y</code>.
          <Code>
{`// get tile at position
const tile = getTile();

// if on coin, open dialogue box
if (tile === 'coin') say('You found the coin!');`}
          </Code>
          Tiles can be modified with <code>setTile</code> and
          {' '}<code>setTileAt</code>.<br /><br />
          <code>setTile(tile)</code> returns index of tile at current position.
          <br />
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
          Objects can be retrieved with <code>getObject</code>.
          <br /><br />
          <code>getObject(id)</code> returns the first reference of an{' '}
          object with given <code>id</code>.
          <Code>
{`// get object with ID 'player'
const player = getObject('player');

// move player right
player.move('right');`}
          </Code>
          Objects can be created and deleted with <code>createObject</code>
          {' '}and <code>deleteObject</code>.<br /><br />
          <code>createObject(object, x, y, options?)</code> creates{' '}
          <code>object</code> at <code>x</code>, <code>y</code> pixels.<br />
          - <code>options</code> is an optional object containing an{' '}
          <code>id</code> field.<br />
          <code>deleteObject(id)</code> deletes object with given{' '}
          <code>id</code>.
          <Code>
{`// create new player
const player2 = createObject('player', 0, 0, { id: 'player2' });

// delete new player
deleteObject('player2');`}
          </Code>
          Object layers can be retrieved and set with <code>getLayer</code>
          {' '}and <code>setLayer</code>.<br /><br />
          <code>getLayer()</code> returns the object layer.<br />
          <code>setLayer(layer)</code> sets the object layer to{' '}
          <code>layer</code>.
          <Code>
{`// send object to background
setLayer('back');

// returns 'back'
getLayer();
`}
          </Code>
          <hr />
          <div id="audio" className={styles.bookmark} />
          <h2>
            <VolumeUpIcon />
            Audio
            <a href="#audio">
              <LinkIcon />
            </a>
          </h2>
          Sounds can be added and played with <code>addSound</code> and {' '}
          <code>playSound</code>.<br /><br />
          <code>addSound(name, url)</code> registers sound with source{' '}
          <code>url</code> and given <code>name</code>.<br />
          <code>playSound(name)</code> plays sound with given{' '}
          <code>name</code>.
          <Code>
{`// add powerup sound
addSound('powerup', 'https://codetrain.org/sounds/powerup.mp3');

// play powerup sound
playSound('powerup');`}
          </Code>
          <hr />
          <div id="utility" className={styles.bookmark} />
          <h2>
            <BuildIcon />
            Utility
            <a href="#utility">
              <LinkIcon />
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}
