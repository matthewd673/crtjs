import './RunButton.css';
import { useState } from 'react';
import { run, stop } from '../crt';

const RunButton = (props) => {

  const [isRunning, setIsRunning] = useState(false);

  const onClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      run(props.code);
    }
    else {
      stop();
      setIsRunning(false);
    }
  }

  return (
    <button className={`button ${ isRunning ? 'button-stop' : 'button-run' }`} onClick={onClick}>{ isRunning ? 'Stop' : 'Run'}</button>
  );
}

export default RunButton;