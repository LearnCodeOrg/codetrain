import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import 'ace-builds/src-noconflict/ext-language_tools';

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
      height="100%"
      {...props}
    />
  );
}
