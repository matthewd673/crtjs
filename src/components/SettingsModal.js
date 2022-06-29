import './SettingsModal.css'
import { DialogButton, DialogButtonContainer } from './DialogButton';

const SettingsModal = () => {

  const cancelButtonOnClick = () => {
    
  }

  const saveButtonOnClick = () => {

  }

  return (
    <div className="settings-modal">
      <h1>Settings</h1>
      <p>(settings go here)</p>

      <DialogButtonContainer>
        <DialogButton
          text="Cancel"
          onClick={cancelButtonOnClick}
          />
        <DialogButton
          text="Save"
          buttonStyle="primary"
          onClick={saveButtonOnClick}
          />
      </DialogButtonContainer>
    </div>
  );
}

export default SettingsModal;