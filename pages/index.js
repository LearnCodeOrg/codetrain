import Game from '../components/Game.js';
import Guide from '../components/Guide.js';
import Colors from '../components/Colors.js';
import Tiles from '../components/Tiles.js';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

// units
const spriteCount = 16;
const spriteSize = 8;

const defaultCode =
`// called once when the game starts
function start() {

}

// called every frame
function update() {

}
`;

export default function Index() {
  const [codes, setCodes] = useState(Array(spriteCount).fill(defaultCode));

  const [currSprite, setCurrSprite] = useState(0);

  const defaultColors = palettes[0].colors;
  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);

  const defaultSprites = Array(spriteCount).fill(
    Array(spriteSize * spriteSize).fill(0)
  );
  const [tiles, setTiles] = useState(defaultSprites);

  return (
    <div className={styles.container}>
      <Code
        currSprite={currSprite}
        spriteCount={spriteCount}
        codes={codes}
        setCodes={setCodes}
      />
      <Colors
        colors={colors} setColors={setColors}
        currColor={currColor} setCurrColor={setCurrColor}
      />
      <Tiles
        colors={colors}
        tiles={tiles} setTiles={setTiles}
        currColor={currColor} setCurrColor={setCurrColor}
        currSprite={currSprite} setCurrSprite={setCurrSprite}
        spriteCount={spriteCount}
        spriteSize={spriteSize}
      />
      <Game
        tiles={tiles}
        colors={colors}
        spriteSize={spriteSize}
        currSprite={currSprite}
        codes={codes}
      />
    </div>
  );
}
