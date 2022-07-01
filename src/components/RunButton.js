import './RunButton.css';

const RunButton = (props) => {
  return (
    <button
      className={`button ${ props.isRunning ? 'button-stop' : 'button-run' }`}
      onClick={props.onClick}
      >
        { props.isRunning ? 'Stop' : 'Run' }
    </button>
  );
}

export default RunButton;