import Game from '../components/Game.js';
import Guide from '../components/Guide.js';
import Sprites from '../components/Sprites.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

const spriteCount = 16;
const spriteSize = 8;

export default function Index() {
  const [currSprite, setCurrSprite] = useState(0);

  const defaultColors = palettes[0].colors;
  const [colors, setColors] = useState(defaultColors);

  const defaultSprites = Array(spriteCount).fill(
    Array(spriteSize * spriteSize).fill(0)
  );
  const [sprites, setSprites] = useState(defaultSprites);

  return (
    <div className={styles.container}>
      <Code currSprite={currSprite} spriteCount={spriteCount} />
      <Sprites
        colors={colors}
        setColors={setColors}
        sprites={sprites}
        setSprites={setSprites}
        setColors={setColors}
        currSprite={currSprite}
        setCurrSprite={setCurrSprite}
        spriteCount={spriteCount}
        spriteSize={spriteSize}
      />
      <Game
        sprites={sprites}
        colors={colors}
        spriteSize={spriteSize}
        currSprite={currSprite}
      />
    </div>
  );
}
