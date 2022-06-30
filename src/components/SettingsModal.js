import './SettingsModal.css'
import { useContext } from 'react';
import Checkbox from './Checkbox';
import { DialogButton, DialogButtonContainer } from './DialogButton';
import Dropdown from './Dropdown';
import { SettingsContext } from '../contexts/SettingsContext';
import { saveObject } from '../Storage';

const SettingsModal = (props) => {
  const settings = useContext(SettingsContext);

  const cancelButtonOnClick = () => {
    // TODO: reload saved settings
    props.onHide();
  }

  const saveButtonOnClick = () => {
    saveObject('settings', settings);
    props.onHide();
  }

  return (
    <div className="settings-modal">
      <h1>Settings</h1>

      <Checkbox
        text="Auto-save to localStorage"
        checked={settings.autosave}
        onChange={() => settings.setAutosave(!settings.autosave)}
        />

      {/* <Checkbox
        text="Collapse API Docs by default"
        checked={settings.collapseApiDocs}
        onChange={() => settings.setAutosave(!settings.autosave)}
        /> */}

      <Dropdown
        text="Editor Theme"
        selected={settings.editorTheme}
        options={['Light', 'Dark']}
        onSelect={(selected) => settings.setEditorTheme(selected)}
        >
      </Dropdown>

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