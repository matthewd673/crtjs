import './App.css';
import { useContext, useState } from 'react';
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

import { loadObject, promptDownloadText } from './Storage';
import { SettingsContext } from './contexts/SettingsContext';

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

  const settings = useContext(SettingsContext);

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [editorText, setEditorText] = useState(defaultValue);

  const onEditorTextChange = (text) => {
    setEditorText(text);
  }

  const applySettings = (value) => {
    settings.setAutosave(value.autosave);
    settings.setEditorTheme(value.editorTheme);
  }

  const openSettingsModal = () => {
    let loaded = loadObject('settings');
    if (loaded !== null) {
      applySettings(loaded);
    }
    setShowSettingsModal(true);
  }

  return (
    <div className="page-container">
      <ModalContainer visible={showSettingsModal}>
        <SettingsModal onHide={() => setShowSettingsModal(false) } />
      </ModalContainer>
      <MenuBar>
        <p>CRT.js</p>
        <button onClick={() => promptDownloadText(editorText, 'code.js')}>Download</button>
        <button onClick={openSettingsModal}>Settings</button>
        <a className='promo-link' href="https://github.com/matthewd673">@matthewd673</a>
      </MenuBar>
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