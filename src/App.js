import './App.css';
import AceEditor from 'react-ace';
import Canvas from './components/Canvas';

function onChange(newValue) {
  console.log("change", newValue);
}

const App = () => {
  return (
    <div className="page-container">
      <div className="editor-container">
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="editor"
        />
      </div>
      <div className="preview-container">
        <Canvas className="preview"/>
      </div>
    </div>
  );
}

export default App;