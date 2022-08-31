import './WelcomeModal.css'
import { DialogButton, DialogButtonContainer } from './DialogButton';

const WelcomeModal = (props) => {

  const closeButtonOnClick = () => {
    props.onHide();
  }

  return (
    <div className="welcome-modal">
      <h1>Welcome to CRT.js</h1>

      <DialogButtonContainer>
        <DialogButton
          text="Let's go!"
          buttonStyle="primary"
          onClick={closeButtonOnClick}
          />
      </DialogButtonContainer>
    </div>
  );
}

export default WelcomeModal;