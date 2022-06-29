import './SettingsModal.css'
import Checkbox from './Checkbox';
import { DialogButton, DialogButtonContainer } from './DialogButton';
import { useState } from 'react';

const SettingsModal = (props) => {

  const [autosaveChecked, setAutosaveChecked] = useState(true);

  const cancelButtonOnClick = () => {
    // TODO: reload saved settings
    props.onHide();
  }

  const saveButtonOnClick = () => {
    // TODO: save settings
    props.onHide();
  }

  return (
    <div className="settings-modal">
      <h1>Settings</h1>

      <Checkbox
        text="Auto-save to localStorage"
        checked={autosaveChecked}
        onChange={() => setAutosaveChecked(!autosaveChecked)}
        />

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