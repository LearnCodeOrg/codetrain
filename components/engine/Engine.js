import GameEditor from './GameEditor.js';
import Guide from './Guide.js';
import Colors from './Colors.js';
import Tiles from './Tiles.js';
import Objects from './Objects.js';
import Draw from './Draw.js';
import Code from './Code.js';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import signInWithGoogle from '../../util/signInWithGoogle.js';
import { useEffect, useState } from 'react';

import styles from '../../styles/components/engine/Engine.module.css';

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

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const uid = firebase.auth().currentUser?.uid;
  const projectsRef = firebase.firestore().collection('projects');

  // ensure single sprite selection
  useEffect(() => {
    if (currTile !== -1 && currObject !== -1) setCurrObject(-1);
  }, [currTile]);
  useEffect(() => {
    if (currObject !== -1 && currTile !== -1) setCurrTile(-1);
  }, [currObject]);

  // saves project to firebase
  async function saveProject() {
    // return if not authed
    if (!uid) return;
    // construct project object
    const projectObj = {
      creator: uid,
      title, description,
      codes, colors, gameObjects, background,
      tiles: JSON.stringify(tiles),
      objects: JSON.stringify(objects)
    };
    // if own project and existing, save
    if (data.creator && uid === data.creator && projectId) {
      await projectsRef.doc(projectId).update(projectObj);
      window.onbeforeunload = null;
    // if no existing project, publish new project
    } else {
      const docRef = await projectsRef.add(projectObj);
      Router.push(`/projects/${docRef.id}`);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        {
          firebase.auth().currentUser ?
          <form onSubmit={e => {
            e.preventDefault();
            saveProject();
          }}>
            <input
              placeholder="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            {
              (!data.creator || uid === data.creator) ?
              <button>Save</button> :
              <button>Remix</button>
            }
          </form> :
          <button onClick={signInWithGoogle}>Sign in to save</button>
        }
      </div>
      <div className={styles.content}>
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
    </div>
  );
}
