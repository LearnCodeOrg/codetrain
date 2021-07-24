import AceEditor from 'react-ace';

import { useState } from 'react';

import 'ace-builds/webpack-resolver.js';
import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Editor.module.css';

// props to be applied to all editors
const editorProps = {
  mode: "javascript",
  theme: "monokai",
  wrapEnabled: true,
  showPrintMargin: false,
  width: "100%"
};

export default function Editor() {
  const [startCode, setStartCode] = useState('');
  const [updateCode, setUpdateCode] = useState('');
  const [drawCode, setDrawCode] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1>Start</h1>
        <AceEditor
          name="start-editor"
          value={startCode}
          onChange={val => setStartCode(val)}
          { ...editorProps }
        />
      </div>
      <div className={styles.panel}>
        <h1>Update</h1>
        <AceEditor
          name="update-editor"
          value={updateCode}
          onChange={val => setUpdateCode(val)}
          { ...editorProps }
        />
      </div>
      <div className={styles.panel}>
        <h1>Draw</h1>
        <AceEditor
          name="draw-editor"
          value={drawCode}
          onChange={val => setDrawCode(val)}
          { ...editorProps }
        />
      </div>
    </div>
  );
}
