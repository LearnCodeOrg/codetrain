import AceEditor from 'react-ace';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MatButton from '../components/MatButton';

import { useState } from 'react';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import 'ace-builds/src-noconflict/theme-tomorrow.js';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

import styles from '../styles/components/CodeEditor.module.css';

const maxFontSize = 48;
const minFontSize = 6;

export default function CodeEditor(props) {
  const [mode, setMode] = useState('dark');
  const [fontSize, setFontSize] = useState(12);

  return (
    <div className={styles.container}>
      <AceEditor
        mode="javascript"
        theme={mode === 'dark' ? 'monokai' : 'tomorrow'}
        wrapEnabled={true}
        showPrintMargin={false}
        tabSize={2}
        setOptions={{
          useWorker: false,
          enableLiveAutocompletion: true
        }}
        width="500px"
        height="590px"
        fontSize={fontSize}
        {...props}
      />
      <div className={mode === 'dark' ? styles.darkbuttons : styles.lightbuttons}>
        <MatButton
          className={styles.addbutton}
          onClick={() => setFontSize(val => Math.min(val + 1, maxFontSize))}
          Icon={AddIcon}
        />
      </div>
    </div>
  );
}
