import React, { useState } from "react"

export const SettingsContext = React.createContext();
export const SettingsProvider = (props) => {

  const [darkMode, setDarkMode] = useState(false);
  const [autosave, setAutosave] = useState(true);

  const [editorTheme, setEditorTheme] = useState('Light');
  const [editorPlaceholder, setEditorPlaceholder] = useState('Verbose');

  const [useCustomLog, setUseCustomLog] = useState(true);
  const [forceCustomLog, setForceCustomLog] = useState(true);
  const [maxLogMessages, setMaxLogMessages] = useState(10);

  return (
    <SettingsContext.Provider value={{
      autosave, setAutosave,
      darkMode, setDarkMode,

      editorTheme, setEditorTheme,
      editorPlaceholder, setEditorPlaceholder,

      useCustomLog, setUseCustomLog,
      forceCustomLog, setForceCustomLog,
      maxLogMessages, setMaxLogMessages,
      }}>
        {props.children}
      </SettingsContext.Provider>
  );
}

export default SettingsProvider;