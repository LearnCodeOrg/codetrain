import Game from '../components/Game.js';
import Guide from '../components/Guide.js';
import Colors from '../components/Colors.js';
import Tiles from '../components/Tiles.js';
import Objects from '../components/Objects.js';
import Draw from '../components/Draw.js';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import styles from '../styles/components/Engine.module.css';

const Code = dynamic(import('../components/Code.js'), { ssr: false });

export default function Engine(props) {
  const { data, projectId, objectCount, tileCount, spriteSize } = props;

  const [codes, setCodes] = useState(data.codes);

  const [currColor, setCurrColor] = useState(0);
  const [currTile, setCurrTile] = useState(0);
  const [currObject, setCurrObject] = useState(-1);
  const [colors, setColors] = useState(data.colors);
  const [tiles, setTiles] = useState(JSON.parse(data.tiles));
  const [objects, setObjects] = useState(JSON.parse(data.objects));

  const [collapsed, setCollapsed] = useState(false);

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
      <button onClick={() => setCollapsed(oldCollapsed => !oldCollapsed)}>
        {
          collapsed ? <ArrowRightIcon /> : <ArrowDropDownIcon />
        }
      </button>
      <div className={styles.draw} style={collapsed ? { display: 'none' } : {}}>
        <div>
          <Colors
            colors={colors} setColors={setColors}
            currColor={currColor} setCurrColor={setCurrColor}
          />
          <Draw
            colors={colors} tiles={tiles} objects={objects}
            currTile={currTile} currObject={currObject}
            currColor={currColor} spriteSize={spriteSize}
            setTiles={setTiles} setObjects={setObjects}
          />
        </div>
        <div>
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
        </div>
      </div>
      <Game
        projectId={projectId} creator={data.creator}
        colors={colors} tiles={tiles} objects={objects}
        spriteSize={spriteSize}
        currTile={currTile}
        currObject={currObject}
        codes={codes}
        background={data.background} gameObjects={data.gameObjects}
        title={data.title} description={data.description}
      />
    </div>
  );
}
