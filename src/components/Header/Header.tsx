import { useCallback, useContext, useEffect, useState } from 'react';
import { PositionContext } from '../../store/positionContext';

const zoomSelect = ['25', '30', '40', '50', '60', '70', '80', '90', '100', '125', '150'];

const Header = () => {
  const [isVisibleZoomSelect, setIsVisibleZoomSelect] = useState(false);
  const { setPosition, draggableRef, scale, setScale } = useContext(PositionContext);

  const zoomSelectVisibilityHandler = () => {
    setIsVisibleZoomSelect((prevState) => !prevState);
  };

  const centerPositionHandler = useCallback(() => {
    if (draggableRef?.current) {
      setPosition?.({
        x: window.innerWidth / 2 - draggableRef.current.clientWidth / 2,
        y: window.innerHeight / 2 - draggableRef.current.clientHeight / 2,
      });
    }
  }, [draggableRef, setPosition]);

  useEffect(() => {
    centerPositionHandler();
  }, [centerPositionHandler]);

  const zoomInHandler = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const zoomOutHandler = () => {
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : 0.1));
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

          <button
            className="controls__center-btn controls-btn"
            onClick={centerPositionHandler}
          ></button>

          <button
            id="zoom-out"
            className="controls__zoom-out-btn controls-btn"
            onClick={zoomOutHandler}
          >
            &#8722;
          </button>
          <button
            className="controls__select-zoom-btn controls-btn"
            onClick={zoomSelectVisibilityHandler}
          >
            {(scale * 100).toFixed()}%
          </button>
          {isVisibleZoomSelect && (
            <ul className="controls__select-zoom-list">
              {zoomSelect.map((value) => (
                <li key={value} onClick={() => setScale(+value * 0.01)}>
                  {value}%
                </li>
              ))}
            </ul>
          )}
          <button className="controls__zoom-in-btn controls-btn" onClick={zoomInHandler}>
            &#43;
          </button>
          <p className="header__tooltip">Go to center</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
