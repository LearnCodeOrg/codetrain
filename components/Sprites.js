import { useState } from 'react';

import styles from '../styles/Sprites.module.css';

const defaultColors = ['#dfdfdf', '#9f9f9f', '#606060', '#202020'];
const defaultSprites = Array(16).fill(Array(64).fill(0));

export default function Sprites() {
  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);
  const [sprites, setSprites] = useState(defaultSprites);
  const [currSprite, setCurrSprite] = useState(0);

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
