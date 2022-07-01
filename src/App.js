import './App.css';
import { useContext, useEffect, useState, useRef, useCallback } from 'react';
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

import { loadObject, saveObject, promptDownloadText } from './Storage';
import { SettingsContext } from './contexts/SettingsContext';
import ConsoleDisplay from './components/ConsoleDisplay';
import { ToastView } from './components/Toast';
import Tooltip from './components/Tooltip';

import { run, stop } from './CRT';

const App = () => {

  const settings = useContext(SettingsContext);
  const applySettings = (value) => {
    settings.setDarkMode(value.darkMode);
    settings.setAutosave(value.autosave);
    
    settings.setEditorTheme(value.editorTheme);
    settings.setEditorPlaceholder(value.editorPlaceholder);

    settings.setUseCustomLog(value.useCustomLog);
    settings.setForceCustomLog(value.forceCustomLog);
    settings.setMaxLogMessages(value.maxLogMessages);
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
const loop = (tick) => {

}

return { init, loop }`;
  const editorPlaceholderMinimal = `const init = () => {

}

const loop = (tick) => {

}

return { init, loop }`;

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [editorText, setEditorText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hotReload, setHotReload] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [mousePos, setMousePos] = useState([]);

  const consoleDisplayRef = useRef(null);

  const onEditorTextChange = (text) => {
    setEditorText(text);
  }

  const openSettingsModal = () => {
    loadSettings();
    setShowSettingsModal(true);
  }

  let logMessageCount = 0;
  const pushLogMessage = (message) => {
    if (consoleDisplayRef === null) return;
    let msgElement = document.createElement('p');
    msgElement.innerText = message;
    consoleDisplayRef.current.appendChild(msgElement);
    logMessageCount++;

    if (logMessageCount > settings.maxLogMessages) {
      consoleDisplayRef.current.removeChild(consoleDisplayRef.current.firstChild);
      logMessageCount--;
    }
  }

  const clearLogMessages = () => {
    if (consoleDisplayRef === null) return;
    consoleDisplayRef.current.innerHTML = '';
    logMessageCount = 0;
  }

  const addToast = (toast) => {
    setToasts([toast, ...toasts]);
  }

  const loadAutosave = () => {
    let save = loadObject('code');
    if (save !== null) setEditorText(save);
  }

  const runCode = (doHotReload = false) => {
    if (!isRunning || doHotReload) {
      if (settings.autosave) {
        saveObject('code', editorText);
      }
      run(editorText, pushLogMessage, settings.useCustomLog, settings.forceCustomLog, doHotReload);
      setIsRunning(true);
    }
    else {
      stop();
      clearLogMessages();
      setIsRunning(false);
    }
  }

  const mouseMoveHandler = useCallback((e) => {
    setMousePos({x: e.clientX, y: e.clientY});
  }, [])

  const keyboardShortcutHandler = useCallback((e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      if (hotReload) runCode(true);
    }
  }, [hotReload, runCode]);

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    document.addEventListener('keydown', keyboardShortcutHandler);
    document.addEventListener('mousemove', mouseMoveHandler);

    if (isFirstRender) {
      loadSettings();

      setEditorText(editorPlaceholderVerbose);

      if (loadObject('code') !== null) {
        addToast({
          title: 'Autosave available',
          text: 'Would you like to pick up where you left off?',
          actionText: 'Load',
          cancelText: 'Ignore',
          onClick: loadAutosave,
        });
      }
    }

    return () => document.removeEventListener('keydown', keyboardShortcutHandler);
  }); // listing the dependencies caused a mess and this works so...

  const [showHotReloadTooltip, setShowHotReloadTooltip] = useState(false);

  return (
    <div className={`page-container ${settings.darkMode ? 'dark' : ''}`}>
      <ModalContainer visible={showSettingsModal}>
        <SettingsModal onHide={() => setShowSettingsModal(false) } />
      </ModalContainer>
      <MenuBar>
        <p>CRT.js</p>
        <button onClick={() => promptDownloadText(editorText, 'code.js')}>Download</button>
        <button onClick={openSettingsModal}>Settings</button>
        <button
          className={`hotreload-button ${ hotReload ? 'hotreload-enabled' : ''}`}
          onClick={() => setHotReload(!hotReload)}
          onMouseEnter={() => setShowHotReloadTooltip(true)}
          onMouseLeave={() => setShowHotReloadTooltip(false)}
          >
            <span className="hotreload-indicator">🔥</span>Hot Reload
        </button>
        <Tooltip visible={showHotReloadTooltip} mousePos={mousePos}><span><i>(Ctrl+S to reload)</i></span></Tooltip>
        <a className="promo-link" href="https://github.com/matthewd673">@matthewd673</a>
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
              value={editorText}
            />
            <RunButton onClick={() => runCode(false) } isRunning={isRunning}/>
          </GroupBox>
          <GroupBox title="API Docs" expandable={true} expanded={false}>
            <DocView />
          </GroupBox>
        </div>
        <div className="right-container">
          <GroupBox title="Preview" expanded={true}>
            <div className='preview-container'>
              <Canvas className="preview"/>
              <ConsoleDisplay innerRef={consoleDisplayRef}/>
            </div>
          </GroupBox>
        </div>
        <ToastView
          toasts={toasts}
          />
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