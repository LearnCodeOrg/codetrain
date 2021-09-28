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
  const { currObject, codes, setCodes, objectNames, setObjectNames } = props;

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
        {
          currObject !== -1 ?
          <div className={styles.toolbar}>
            <input
              className={`${styles.nameinput} monospace`}
              value={objectNames[currObject]}
              onChange={e => updateObjectName(e.target.value)}
            />
            <span className="flexfill" />
            <button className={styles.compilebutton} onClick={compile}>
              <PlayArrowIcon />
            </button>
          </div> :
          <p className={styles.placeholder}>Select an object to write code.</p>
        }
        {
          currObject !== -1 &&
          <CodeEditor
            value={codes[currObject]}
            onChange={val => updateCode(val)}
          />
        }
      </div>
    </div>
  );
}
