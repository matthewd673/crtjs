import './Toolbar.css';

const ToolbarButton = (props) => {
  return (
    <button className="toolbar-button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      {props.children}
    </div>
  );
}

export { Toolbar, ToolbarButton };