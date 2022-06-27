import './App.css';
import { useState } from 'react';
import Canvas from './components/Canvas';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chrome';
import RunButton from './components/RunButton';

const App = () => {
  
  const [editorText, setEditorText] = useState('');

  const onChange = (text) => {
    setEditorText(text);
  }

  return (
    <div className="page-container">
      <div className="editor-container">
        <AceEditor
          mode="javascript"
          theme="chrome"
          onChange={onChange}
          name="editor"
          width="550px"
          height="100%"
          showPrintMargin={false}
        />
        <RunButton code={editorText}/>
      </div>
      <div className="preview-container">
        <Canvas className="preview"/>
      </div>
    </div>
  );
}

export default App;