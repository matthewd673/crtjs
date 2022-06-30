import './NumberBox.css';

const NumberBox = (props) => {

  const onChange = (event) => {
    props.onChange(parseInt(event.target.value))
  }

  return (
    <div className="numberbox-container">
      <p>{props.label}</p>
      <input
        className="numberbox"
        type="number"
        value={props.text}
        placeholder={props.placeholder}
        onChange={onChange}
        />
    </div>
  )
}

export default NumberBox;