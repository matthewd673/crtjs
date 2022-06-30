import './GroupBox.css'
import { useState } from 'react';

const GroupBox = (props) => {

  const [expanded, setExpanded] = useState(props.expanded);

  const collapseButtonOnClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div className={`groupbox ${props.expandable ? 'expandable' : ''}`}>
      <div className='groupbox-titlebar'>
        <p>{props.title}</p>
        { props.expandable ?
          <button
            className='collapse-button'
            onClick={collapseButtonOnClick}
            >
            { expanded ? 'Collapse' : 'Expand' }
          </button>
          :
          <></>
        }
      </div>
      <div
        className={`child-container ${ expanded ? 'expanded' : 'collapsed' }`}
        >
        {props.children}
      </div>
    </div>
  );
}

export default GroupBox;