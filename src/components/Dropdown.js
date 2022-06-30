import './Dropdown.css'
import { useState, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

const Dropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onSelect = (option) => {
    props.onSelect(option);
  }

  const dropdownOptions = props.options.map((o, i) =>
    <p key={i} onClick={() => onSelect(o)}>{o}</p>
  );

  const ref = useRef(null);
  useOnClickOutside(ref, () => setDropdownOpen(false));

  return (
    <div
        className="dropdown-container">
          <p className="dropdown-text">{props.text}</p>
          <div
            ref={ref}
            className={`dropdown-box ${dropdownOpen ? 'open' : 'closed' }`}
            onClick={() => setDropdownOpen(!dropdownOpen) }
            >
            <p className="selected-option-text">{props.selected}</p>
            <div className={`dropdown-list ${dropdownOpen ? 'open' : 'closed' }`}>
              {dropdownOptions}
            </div>
          </div>
      </div>
  );
}

export default Dropdown;