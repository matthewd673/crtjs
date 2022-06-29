import './ModalContainer.css'

const ModalContainer = (props) => {
  return (
    <div className="modal-container">
      {props.children}
    </div>
  );
}

export default ModalContainer;