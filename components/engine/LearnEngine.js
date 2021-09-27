import GameEditor from './GameEditor.js';
import Code from './Code.js';

import firebase from 'firebase/app';
import signInWithGoogle from '../../util/signInWithGoogle';
import { useEffect, useState } from 'react';
import { palettes } from '../../data/palettes';

export default function LearnEngine(props) {
  const { data, spriteSize, mapSize, username } = props;

  // default data
  const colors = palettes[0].colors;
  const background = Array(mapSize * mapSize).fill(0);
  const tiles = [Array(spriteSize * spriteSize).fill(0)];
  const objects = [JSON.parse(data.object)];

  const [codes, setCodes] = useState([data.code]);
  const [objectNames, setObjectNames] = useState([data.objectName]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Code
          currObject={0}
          codes={codes} setCodes={setCodes}
          objectNames={objectNames} setObjectNames={setObjectNames}
        />
        <GameEditor
          tutorial
          colors={colors} tiles={tiles} objects={objects}
          objectNames={objectNames}
          spriteSize={spriteSize}
          currTile={-1}
          currObject={-1}
          codes={codes}
          background={background} gameObjects={data.gameObjects}
          title={data.title} description={data.description}
        />
      </div>
    </div>
  );
}
