import { useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Sprites.module.css';

export default function Sprites() {
  const [colors, setColors] = useState(palettes[0].colors);
  const [currColor, setCurrColor] = useState(0);
  const [sprites, setSprites] = useState(Array(16).fill(Array(64).fill(0)));
  const [currSprite, setCurrSprite] = useState(0);

  const [palette, setPalette] = useState(0);

  // updates current color with given value
  function updateColor(val) {
    const newColors = colors.slice();
    newColors.splice(currColor, 1, val);
    setColors(newColors);
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Colors</h1>
        <div className={styles.tilegrid}>
          {
            colors.map((color, i) =>
              <div
                onClick={() => setCurrColor(i)}
                className={
                  currColor === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={i}
                style={{ background: color }}
              >
              </div>
            )
          }
        </div>
        <input
          type="color"
          value={colors[currColor]}
          className={styles.colorinput}
          onChange={e => updateColor(e.target.value)}
        />
        <select
          value={palette}
          onChange={e => {
            const newPalette = e.target.value;
            setPalette(newPalette);
            setColors(palettes[newPalette].colors);
          }}
        >
        {
          palettes.map((pal, i) =>
            <option value={i} key={i}>{pal.name}</option>
          )
        }
        </select>
      </div>
      <div>
        <h1>Sprites</h1>
        <div className={styles.tilegrid}>
          {
            sprites.map((sprite, i) =>
              <div
                onClick={() => setCurrSprite(i)}
                className={
                  currSprite === i ?
                  `${styles.tile} ${styles.selected}` :
                  styles.tile
                }
                key={i}
                style={{ background: colors[sprite[0]] }}
              >
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
