import { useEffect } from 'react';
import './Tooltip.css';

const Tooltip = (props) => {

  useEffect(() => {
    
  });

  return (
    <div
      className={`tooltip ${props.visible ? 'visible' : ''}`}
      style={{
        left: props.mousePos.x + 14,
        top: props.mousePos.y + 20
      }}>
      {props.children}
    </div>
  );
}

export default Tooltip;