import Game from '../components/Game.js';
import Guide from '../components/Guide.js';
import Sprites from '../components/Sprites.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

const spriteCount = 16;

export default function Index() {
  const [currSprite, setCurrSprite] = useState(0);

  return (
    <div className={styles.container}>
      <Guide />
      <Code currSprite={currSprite} spriteCount={spriteCount} />
      <Sprites
        currSprite={currSprite}
        setCurrSprite={setCurrSprite}
        spriteCount={spriteCount}
      />
      <Game />
    </div>
  );
}
