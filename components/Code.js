import AceEditor from 'react-ace';

import { useState } from 'react';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Code.module.css';

export default function Code() {
  const [code, setCode] = useState('');

  return (
    <div>
      <AceEditor
        value={code}
        onChange={val => setCode(val)}
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
