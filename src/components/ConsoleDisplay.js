import './ConsoleDisplay.css'
import { useEffect, useRef } from 'react';

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