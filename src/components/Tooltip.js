import { useEffect } from 'react';
import './Tooltip.css';

const Tooltip = (props) => {

  useEffect(() => {
    
  });

  return (
    <div
      className="tooltip"
      style={{
        left: props.mousePos.x + 14,
        top: props.mousePos.y + 20,
        display: props.visible ? 'block' : 'none'
      }}>
      {props.children}
    </div>
  );
}

export default Tooltip;