import React, { useState } from "react"

export const SettingsContext = React.createContext();
export const SettingsProvider = (props) => {

  const [darkMode, setDarkMode] = useState(false);
  const [autosave, setAutosave] = useState(true);
  const [editorTheme, setEditorTheme] = useState('Light');
  const [editorPlaceholder, setEditorPlaceholder] = useState('Verbose');

  return (
    <SettingsContext.Provider value={{
      autosave, setAutosave,
      darkMode, setDarkMode,
      editorTheme, setEditorTheme,
      editorPlaceholder, setEditorPlaceholder,
      }}>
        {props.children}
      </SettingsContext.Provider>
  );
}

export default SettingsProvider;