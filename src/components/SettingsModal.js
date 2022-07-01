import './SettingsModal.css'
import { useContext } from 'react';
import Checkbox from './Checkbox';
import { DialogButton, DialogButtonContainer } from './DialogButton';
import Dropdown from './Dropdown';
import { SettingsContext } from '../contexts/SettingsContext';
import { saveObject } from '../Storage';
import NumberBox from './NumberBox';

const SettingsModal = (props) => {
  const settings = useContext(SettingsContext);

  const toggleDarkMode = () => {
    settings.setDarkMode(!settings.darkMode);
    settings.setEditorTheme(!settings.darkMode ? 'Dark' : 'Light');
  }

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
        text="Dark Mode 🌙"
        checked={settings.darkMode}
        onChange={toggleDarkMode}
        />

      <Checkbox
        text="Auto-save to localStorage"
        checked={settings.autosave}
        onChange={() => settings.setAutosave(!settings.autosave)}
        />
      
      <Dropdown
        text="Editor Theme"
        selected={settings.editorTheme}
        options={['Light', 'Dark']}
        onSelect={(selected) => settings.setEditorTheme(selected)}
        />
      
      {/* <Dropdown
        text="Editor Placeholder Text"
        selected={settings.editorPlaceholder}
        options={['Verbose', 'Minimal', 'Empty']}
        onSelect={(selected) => settings.setEditorPlaceholder(selected)}
        /> */}

      <Checkbox
        text="Use custom log"
        checked={settings.useCustomLog}
        onChange={() => settings.setUseCustomLog(!settings.useCustomLog)}
        />
      
      <Checkbox
        text="Redirect alert() to custom log"
        checked={settings.forceCustomLog}
        onChange={() => settings.setForceCustomLog(!settings.forceCustomLog)}
        />
      
      <NumberBox
        label="Maximum log messages"
        text={settings.maxLogMessages}
        onChange={(value) => settings.setMaxLogMessages(value)}
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