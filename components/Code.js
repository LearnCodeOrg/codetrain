import AceEditor from 'react-ace';

import { useState } from 'react';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Code.module.css';

const defaultCode =
`// called once when the game starts
function start() {

}

// called every frame
function update() {

}
`;

export default function Code(props) {
  const { spriteCount, currSprite } = props;

  const [codes, setCodes] = useState(Array(spriteCount).fill(defaultCode));

  // updates current color with given value
  function updateCode(val) {
    const newCodes = codes.slice();
    newCodes.splice(currSprite, 1, val);
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
