import { useState } from 'react';

const zoomSelect = ['25', '30', '40', '50', '60', '70', '80', '90', '100', '125', '150'];

const Header = () => {
  const [isVisibleZoomSelect, setIsVisibleZoomSelect] = useState(false);

  const zoomSelectVisibilityHandler = () => {
    setIsVisibleZoomSelect((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/" className="header__services">
            Services
          </a>
          <span className="header__count">0</span>
        </div>
        <div className="header__controls controls">
          <button className="controls__list-view-btn">List view</button>

          <button className="controls__center-btn controls-btn"></button>

          <button id="zoom-out" className="controls__zoom-out-btn controls-btn">
            &#8722;
          </button>
          <button
            className="controls__select-zoom-btn controls-btn"
            onClick={zoomSelectVisibilityHandler}
          >
            <span>100%</span>
          </button>
          {isVisibleZoomSelect && (
            <ul className="controls__select-zoom-list">
              {zoomSelect.map((value) => (
                <li key={value}>{value}%</li>
              ))}
            </ul>
          )}
          <button className="controls__zoom-in-btn controls-btn">&#43;</button>
          <p className="header__tooltip">Go to center</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
