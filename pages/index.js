import Game from '../components/Game.js';
import Guide from '../components/Guide.js';
import Colors from '../components/Colors.js';
import Tiles from '../components/Tiles.js';
import Objects from '../components/Objects.js';
import Draw from '../components/Draw.js';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { palettes } from '../data/palettes.js';

import styles from '../styles/pages/Index.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

// units
const tileCount = 16;
const objectCount = 16;
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
  const [codes, setCodes] = useState(Array(objectCount).fill(defaultCode));

  const [currTile, setCurrTile] = useState(0);
  const [currObject, setCurrObject] = useState(-1);

  const defaultColors = palettes[0].colors;
  const [colors, setColors] = useState(defaultColors);
  const [currColor, setCurrColor] = useState(0);

  const defaultSprite = Array(spriteSize * spriteSize).fill(0);
  const [tiles, setTiles] = useState(Array(tileCount).fill(defaultSprite));
  const [objects, setObjects] = useState(Array(objectCount).fill(defaultSprite));

  // ensure single sprite selection
  useEffect(() => {
    if (currTile !== -1 && currObject !== -1) setCurrObject(-1);
  }, [currTile]);
  useEffect(() => {
    if (currObject !== -1 && currTile !== -1) setCurrTile(-1);
  }, [currObject]);

  return (
    <div className={styles.container}>
      <Code
        currObject={currObject}
        objectCount={objectCount}
        codes={codes}
        setCodes={setCodes}
      />
      <Colors
        colors={colors} setColors={setColors}
        currColor={currColor} setCurrColor={setCurrColor}
      />
      <Tiles
        colors={colors}
        tiles={tiles}
        currTile={currTile} setCurrTile={setCurrTile}
        tileCount={tileCount}
        spriteSize={spriteSize}
      />
      <Objects
        colors={colors}
        objects={objects}
        currObject={currObject} setCurrObject={setCurrObject}
        tileCount={tileCount}
        objectCount={objectCount}
        spriteSize={spriteSize}
      />
      <Draw
        colors={colors} tiles={tiles} objects={objects}
        currTile={currTile} currObject={currObject}
        currColor={currColor} spriteSize={spriteSize}
        setTiles={setTiles} setObjects={setObjects}
      />
      <Game
        colors={colors} tiles={tiles} objects={objects}
        spriteSize={spriteSize}
        currTile={currTile}
        currObject={currObject}
        codes={codes}
      />
    </div>
  );
}
