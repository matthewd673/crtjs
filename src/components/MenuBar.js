import './MenuBar.css'

const MenuBar = (props) => {
  return (
    <div className='menu-bar'>
      {props.children}
    </div>
  );
}

export default MenuBar;