import GameEditor from './GameEditor.js';
import Colors from './Colors.js';
import Tiles from './Tiles.js';
import Objects from './Objects.js';
import Draw from './Draw.js';
import Code from './Code.js';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { defaultTileNames } from '../../data/engine';

import styles from '../../styles/components/engine/Engine.module.css';

export default function Engine(props) {
  const { data, projectId, username, setupUser } = props;

  const containerRef = useRef();

  const [codes, setCodes] = useState(data.codes);
  const [objectNames, setObjectNames] = useState(data.objectNames);
  const [tileNames, setTileNames] = useState(data.tileNames ?? defaultTileNames);

  const [currColor, setCurrColor] = useState(0);
  const [currTile, setCurrTile] = useState(-1);
  const [currObject, setCurrObject] = useState(0);
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
    <SnackbarProvider maxSnack={3}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.content}>
          <Code
            currObject={currObject} currTile={currTile}
            codes={codes} setCodes={setCodes}
            objectNames={objectNames} setObjectNames={setObjectNames}
            tileNames={tileNames} setTileNames={setTileNames}
          />
          <div className={styles.draw}>
            <div className={styles.drawtiles}>
              <Colors
                colors={colors} setColors={setColors}
                currColor={currColor} setCurrColor={setCurrColor}
              />
              <Draw
                containerRef={containerRef}
                colors={colors} tiles={tiles} objects={objects}
                currTile={currTile} currObject={currObject} currColor={currColor}
                setTiles={setTiles} setObjects={setObjects}
              />
            </div>
            <div className="flexfill" />
            <div className={styles.tileselect}>
              <Tiles
                containerRef={containerRef}
                colors={colors}
                tiles={tiles}
                currTile={currTile} setCurrTile={setCurrTile}
              />
              <Objects
                containerRef={containerRef}
                colors={colors}
                objects={objects}
                currObject={currObject} setCurrObject={setCurrObject}
              />
            </div>
          </div>
          <GameEditor
            containerRef={containerRef}
            username={username}
            projectId={projectId} creator={data.uid}
            colors={colors} tiles={tiles} objects={objects}
            objectNames={objectNames} tileNames={tileNames}
            currTile={currTile}
            currObject={currObject}
            codes={codes}
            background={data.background} gameObjects={data.gameObjects}
            title={data.title} description={data.description}
            setupUser={setupUser}
          />
        </div>
      </div>
    </SnackbarProvider>
  );
}
