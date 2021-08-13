import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Code.module.css';

export default function Code(props) {
  const { objectCount, currSprite, codes, setCodes } = props;

  // updates current color with given value
  function updateCode(val) {
    const newCodes = codes.slice();
    newCodes[currSprite] = val;
    setCodes(newCodes);
  }

  return (
    <div>
      <AceEditor
        value={codes[currSprite]}
        onChange={val => updateCode(val)}
        mode="javascript"
        theme="monokai"
        wrapEnabled={true}
        showPrintMargin={false}
        tabSize={2}
        setOptions={{ useWorker: false }}
      />
    </div>
  );
}
