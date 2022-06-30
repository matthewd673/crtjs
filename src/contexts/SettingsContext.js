import React, { useState } from "react"

export const SettingsContext = React.createContext();
export const SettingsProvider = (props) => {
  
  const [autosave, setAutosave] = useState(true);
  const [editorTheme, setEditorTheme] = useState('Light');

  return (
    <SettingsContext.Provider value={{
      autosave, setAutosave,
      editorTheme, setEditorTheme
      }}>
        {props.children}
      </SettingsContext.Provider>
  );
}

export default SettingsProvider;