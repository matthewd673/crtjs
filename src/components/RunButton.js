import './RunButton.css';
import { run } from '../crt';

const RunButton = (props) => {

  const onClick = () => {
    run(props.code);
  }

  return (
    <button className='button' onClick={onClick}>Run</button>
  );
}

export default RunButton;