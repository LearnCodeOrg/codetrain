import AceEditor from 'react-ace';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MatButton from '../components/MatButton';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

export default function CodeEditor(props) {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      wrapEnabled={true}
      showPrintMargin={false}
      tabSize={2}
      setOptions={{
        useWorker: false,
        enableLiveAutocompletion: true
      }}
      width="500px"
      height="590px"
      {...props}
    />
  );
}
