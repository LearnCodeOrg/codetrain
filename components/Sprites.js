import { useState } from 'react';

import styles from '../styles/Sprites.module.css';

const defaultColors = ['#dfdfdf', '#9f9f9f', '#606060', '#202020'];

export default function Sprites() {
  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);

  return (
    <div>
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
      <h1>Sprites</h1>
    </div>
  );
}
