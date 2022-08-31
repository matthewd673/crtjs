import './ForeignWarningModal.css';
import { DialogButton } from './DialogButton';

const ForeignWarningModal = (props) => {
  return (
    <div className="foreignwarning-modal">
      <h2>Shared code has been loaded ⚠️</h2>
      <p>Never execute code unless it comes from a trusted source.</p>
      <br />
      <DialogButton text="Got it" buttonStyle="primary" onClick={props.onHide}/>
    </div>
  )
}

export default ForeignWarningModal;