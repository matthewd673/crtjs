import './RunButton.css';
import { useContext, useState } from 'react';
import { run, stop } from '../CRT';

import { SettingsContext } from '../contexts/SettingsContext';
import { saveObject } from '../Storage';

const RunButton = (props) => {

  const settings = useContext(SettingsContext);

  const [isRunning, setIsRunning] = useState(false);

  const onClick = () => {
    if (!isRunning) {
      if (settings.autosave) {
        saveObject('code', props.code);
      }
      setIsRunning(true);
      run(props.code, props.logFunction, settings.useCustomLog, settings.forceCustomLog);
    }
    else {
      stop();
      setIsRunning(false);
      props.clearLogFunction();
    }
  }

  return (
    <button
      className={`button ${ isRunning ? 'button-stop' : 'button-run' }`}
      onClick={onClick}
      >
        { isRunning ? 'Stop' : 'Run' }
    </button>
  );
}

export default RunButton;