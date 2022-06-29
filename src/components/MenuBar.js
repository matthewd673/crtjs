import './MenuBar.css'

const MenuBar = () => {

  const openSettings = () => {

  }

  return (
    <div className='menu-bar'>
      <p>CRT.js</p>
      <button>Save</button>
      <button>Load</button>
      <button onClick={openSettings}>Settings</button>
      <a className='promo-link' href="https://github.com/matthewd673">@matthewd673</a>
    </div>
  );
}

export default MenuBar;