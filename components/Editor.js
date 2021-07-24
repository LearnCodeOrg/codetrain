import AceEditor from 'react-ace';

import { useState } from 'react';

import 'ace-builds/webpack-resolver.js';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import styles from '../styles/Editor.module.css';

export default function Editor() {
  const [code, setCode] = useState('');

  return (
    <div>
      <AceEditor
        name="code-editor"
        value={code}
        onChange={val => setCode(val)}
        mode="javascript"
        theme="monokai"
        wrapEnabled={true}
        showPrintMargin={false}
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true
        }}
      />
    </div>
  );
}
