import './App.css';
import { useState } from 'react';
import Canvas from './components/Canvas';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-chrome';
import RunButton from './components/RunButton';
import GroupBox from './components/GroupBox';
import DocView from './components/DocView';
import MenuBar from './components/MenuBar';
import ModalContainer from './components/ModalContainer';
import SettingsModal from './components/SettingsModal';

const App = () => {
  
  const defaultValue = `/*
  Welcome to CRT.js!
  Use this editor to write your code.
  When you're done, press 'Run' to see
  it in action.

  @matthewd673
*/

// init() - runs once when the program is loaded
const init = () => {

}

// loop() - runs repeatedly until the program stops
const loop = () => {

}

return { init, loop }`;

  const [editorText, setEditorText] = useState(defaultValue);

  const onEditorTextChange = (text) => {
    setEditorText(text);
  }

  return (
    <div className="page-container">
      <ModalContainer>
        <SettingsModal />
      </ModalContainer>
      <MenuBar/>
      <div className='workspace-container'>
        <div className="left-container">
          <GroupBox title="Editor">
            <AceEditor
              mode="javascript"
              theme="chrome"
              onChange={onEditorTextChange}
              name="editor"
              width="100%"
              height="100%"
              showPrintMargin={false}
              defaultValue={defaultValue}
            />
            <RunButton code={editorText}/>
          </GroupBox>
          <GroupBox title="API Docs" expandable={true}>
            <DocView />
          </GroupBox>
        </div>
        <div className="right-container">
          <GroupBox title="Preview">
            <div className='preview-container'>
              <Canvas className="preview"/>
            </div>
          </GroupBox>
        </div>
      </div>
    </div>
  );
}

export default App;