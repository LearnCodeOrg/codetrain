import GameEditor from './GameEditor.js';
import Colors from './Colors.js';
import Tiles from './Tiles.js';
import Objects from './Objects.js';
import Draw from './Draw.js';
import Code from './Code.js';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import styles from '../../styles/components/engine/Engine.module.css';

export default function Engine(props) {
  const { data, projectId, username, setupUser } = props;

  const [codes, setCodes] = useState(data.codes);
  const [objectNames, setObjectNames] = useState(data.objectNames);

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
      <div className={styles.container}>
        <div className={styles.content}>
          <Code
            currObject={currObject}
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
                currTile={currTile} currObject={currObject} currColor={currColor}
                setTiles={setTiles} setObjects={setObjects}
              />
            </div>
            <div className="flexfill" />
            <div className={styles.tileselect}>
              <Tiles
                colors={colors}
                tiles={tiles}
                currTile={currTile} setCurrTile={setCurrTile}
              />
              <Objects
                colors={colors}
                objects={objects}
                currObject={currObject} setCurrObject={setCurrObject}
              />
            </div>
          </div>
          <GameEditor
            username={username}
            projectId={projectId} creator={data.uid}
            colors={colors} tiles={tiles} objects={objects}
            objectNames={objectNames}
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
