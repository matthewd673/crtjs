import './DialogButton.css'

const DialogButtonContainer = (props) => {
  return (
    <div className='dialog-button-container'>
      {props.children}
    </div>
  );
}

const DialogButton = (props) => {
  return (
    <button
    onClick={props.onClick}
    className={
      `dialog-button ${
        props.buttonStyle === 'primary' ? 'primary' : '' }`
      }>
      {props.text}
    </button>
  );
}

export { DialogButton, DialogButtonContainer }