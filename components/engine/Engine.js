import GameEditor from './GameEditor.js';
import Guide from './Guide.js';
import Colors from './Colors.js';
import Tiles from './Tiles.js';
import Objects from './Objects.js';
import Draw from './Draw.js';
import Code from './Code.js';

import signInWithGoogle from '../../util/signInWithGoogle.js';
import { useEffect, useState } from 'react';

import styles from '../../styles/components/engine/Engine.module.css';

export default function Engine(props) {
  const {
    data, projectId, objectCount, tileCount, spriteSize, username
  } = props;

  const [codes, setCodes] = useState(data.codes);
  const [objectNames, setObjectNames] = useState(data.objectNames);

  const [currColor, setCurrColor] = useState(0);
  const [currTile, setCurrTile] = useState(0);
  const [currObject, setCurrObject] = useState(-1);
  const [colors, setColors] = useState(data.colors);
  const [tiles, setTiles] = useState(JSON.parse(data.tiles));
  const [objects, setObjects] = useState(JSON.parse(data.objects));

  // ensure single sprite selection
  useEffect(() => {
    if (currTile !== -1 && currObject !== -1) setCurrObject(-1);
  }, [currTile]);
  useEffect(() => {
    if (currObject !== -1 && currTile !== -1) setCurrTile(-1);
  }, [currObject]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Code
          currObject={currObject}
          objectCount={objectCount}
          codes={codes} setCodes={setCodes}
          objectNames={objectNames} setObjectNames={setObjectNames}
        />
        <div className={styles.draw}>
          <div className={styles.drawtiles}>
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
          <div className="flexfill" />
          <div className={styles.tileselect}>
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
        <GameEditor
          username={username}
          projectId={projectId} creator={data.creator}
          colors={colors} tiles={tiles} objects={objects}
          objectNames={objectNames}
          spriteSize={spriteSize}
          currTile={currTile}
          currObject={currObject}
          codes={codes}
          background={data.background} gameObjects={data.gameObjects}
          title={data.title} description={data.description}
        />
      </div>
    </div>
  );
}
