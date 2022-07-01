import './ConsoleDisplay.css'

const ConsoleDisplay = (props) => {
  return (
    <div
      ref={props.innerRef}
      className="console-display-container"
      >
    </div>
  );
}

export default ConsoleDisplay;