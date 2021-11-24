import Loading from '../Loading';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import dynamic from 'next/dynamic';
import compileCode from '../../util/compileCode';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import styles from '../../styles/components/engine/Code.module.css';

const CodeEditor = dynamic(import('../CodeEditor.js'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

export default function Code(props) {
  const {
    currObject, currTile, codes, setCodes,
    objectNames, setObjectNames, tileNames, setTileNames
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [compileSuccess, setCompileSuccess] = useState(false);

  // updates current color with given value
  function updateCode(val) {
    const newCodes = codes.slice();
    newCodes[currObject] = val;
    setCodes(newCodes);
  }

  // updates current object name with given value
  function updateObjectName(val) {
    const newObjectNames = objectNames.slice();
    newObjectNames[currObject] = val;
    setObjectNames(newObjectNames);
  }

  // updates current tile name with given value
  function updateTileName(val) {
    const newTileNames = tileNames.slice();
    newTileNames[currTile] = val;
    setTileNames(newTileNames);
  }

  // compiles current object code
  function compile() {
    const header = objectNames[currObject];
    const error = compileCode(codes[currObject]);
    // enqueue snackbar based on result
    if (error) enqueueSnackbar(`[${header}] ${error}`, { variant: 'error'});
    else enqueueSnackbar(
      `[${header}] Compiled successfully.`, { variant: 'success' }
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.toolbar}>
          {
            currObject === -1 ?
            <input
              className={`${styles.nameinput} monospace`}
              value={tileNames[currTile]}
              onChange={e => updateTileName(e.target.value)}
            /> :
            <>
              <input
                className={`${styles.nameinput} monospace`}
                value={objectNames[currObject]}
                onChange={e => updateObjectName(e.target.value)}
              />
              <span className="flexfill" />
              <button className={styles.compilebutton} onClick={compile}>
                <PlayArrowIcon />
              </button>
            </>
          }
        </div>
        {
          currObject === -1 &&
          <p className={styles.placeholder}>
            Select an object to write code.<br /><br />
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            New to Codetrain? See the <a href="/docs">docs.</a>
          </p>
        }
        <div style={{ height: '100%', opacity: currObject === -1 ? 0 : 1 }}>
          <CodeEditor
            value={currObject === -1 ? '' : codes[currObject]}
            readOnly={currObject === -1}
            onChange={val => updateCode(val)}
          />
        </div>
      </div>
    </div>
  );
}
