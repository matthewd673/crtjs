import './Checkbox.css'

const Checkbox = (props) => {

  return (
      <div
        className="checkbox-container"
        onClick={props.onChange}>
        <span className={`toggle ${props.checked ? 'checked' : 'unchecked' }`}>
          <span className="toggle-indicator" />
        </span>
        <p className="checkbox-text">{props.text}</p>
      </div>
  );
}

export default Checkbox;