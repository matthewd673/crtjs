import './App.css';
import { useContext, useEffect, useState, useRef } from 'react';
import Canvas from './components/Canvas';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import RunButton from './components/RunButton';
import GroupBox from './components/GroupBox';
import DocView from './components/DocView';
import MenuBar from './components/MenuBar';
import ModalContainer from './components/ModalContainer';
import SettingsModal from './components/SettingsModal';

import { loadObject, promptDownloadText } from './Storage';
import { SettingsContext } from './contexts/SettingsContext';

const App = () => {

  const settings = useContext(SettingsContext);
  const applySettings = (value) => {
    settings.setDarkMode(value.darkMode);
    settings.setAutosave(value.autosave);
    settings.setEditorTheme(value.editorTheme);
    settings.setEditorPlaceholder(value.editorPlaceholder);
  }

  const loadSettings = () => {
    let loaded = loadObject('settings');
    if (loaded !== null) applySettings(loaded);
  }

  const editorPlaceholderVerbose = `/*
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
  const editorPlaceholderMinimal = `const init = () => {

}

const loop = () => {

}

return { init, loop }`;

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [editorText, setEditorText] = useState('');

  const onEditorTextChange = (text) => {
    setEditorText(text);
  }

  const openSettingsModal = () => {
    loadSettings();
    setShowSettingsModal(true);
  }

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (isFirstRender) {
      loadSettings();
    }
  });

  return (
    <div className={`page-container ${settings.darkMode ? 'dark' : ''}`}>
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
          <GroupBox title="Editor" expanded={true}>
            <AceEditor
              mode="javascript"
              theme={settings.editorTheme === 'Light' ? 'tomorrow' : 'tomorrow_night'}
              onChange={onEditorTextChange}
              name="editor"
              width="100%"
              height="100%"
              showPrintMargin={false}
              defaultValue={editorPlaceholderMinimal}
            />
            <RunButton code={editorText}/>
          </GroupBox>
          <GroupBox title="API Docs" expandable={true} expanded={false}>
            <DocView />
          </GroupBox>
        </div>
        <div className="right-container">
          <GroupBox title="Preview" expanded={true}>
            <div className='preview-container'>
              <Canvas className="preview"/>
            </div>
          </GroupBox>
        </div>
      </div>
    </div>
  );
}

// https://usehooks-ts.com/react-hook/use-is-first-render
function useIsFirstRender() {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}

export default App;