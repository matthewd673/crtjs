import './ConsoleDisplay.css'

const ConsoleDisplay = (props) => {
  return (
    <div className="console-display-container">
      {props.messages.map((m, i) =>
        <p key={i} className='console-message'>{m}</p>
      )}
    </div>
  );
}

export default ConsoleDisplay;