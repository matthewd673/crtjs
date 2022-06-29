import './ModalContainer.css'

const ModalContainer = (props) => {
  return (
    <div
      className={`modal-container ${ props.visible ? 'visible' : 'hidden' }`}>
      {props.children}
    </div>
  );
}

export default ModalContainer;