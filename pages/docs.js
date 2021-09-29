import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from '../styles/pages/Docs.module.css';

function Section(props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {props.title}
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
}

export default function Docs() {
  return (
    <div className={styles.container}>
      <h1>Docs</h1>
      <Section title="Game Loop">
        start(): runs once at the start of the game<br />
        update(): runs once a frame
      </Section>
      <Section title="Input">
        isKeyDown(key): returns whether given key is pressed<br />
        isKey(key): returns whether given key was pressed in the last frame
      </Section>
      <Section title="Output">
        say(text): opens a dialogue box with given text closable with left click
      </Section>
      <Section title="Movement">
        move(dir): moves object one tile up, down, left, or right<br />
        moveTiles(x, y): moves object by x, y in tiles<br />
        movePixels(x, y): moves object by x, y in pixels<br />
        getTilePosition(): returns an object containing x, y position in tiles<br />
        getPixelPosition(): returns an object containing x, y position in pixels
      </Section>
      <Section title="Tiles">
        getTile(): returns index of tile at position<br />
        setTile(tile): sets tile at position to index tile<br />
        getTileAt(x, y): returns index of tile at x, y<br />
        setTileAt(x, y, tile): sets tile at x, y to index tile
      </Section>
      <Section title="Utility">
        range(num): returns an array containing numbers up to num<br />
        sleep(sec): returns a promise expiring in sec seconds
      </Section>
      <Section title="Variables">
        colors: array of color data<br />
        tiles: array of tile sprite data<br />
        objects: array of object sprite data<br />
        background: array of active tile indexes<br />
        gameObjects: array of active objects
      </Section>
      <Section title="Constants">
        mapSize: map size in tiles
        mapPixels: map size in pixels
        spriteSize: sprite size in sprite pixels
        spritePixels: sprite size in pixels
        pixelPixels: sprite pixel size in pixels
      </Section>
    </div>
  )
}
