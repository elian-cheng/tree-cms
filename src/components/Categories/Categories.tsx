import { useCallback, useContext } from 'react';
import { IPosition, PositionContext } from '../../store/positionContext';
import DraggableContainer from '../../components/DraggableContainer/DraggableContainer';

const Categories = () => {
  const { setPosition } = useContext(PositionContext);

  const arrowNavigationHandler = useCallback(
    (coordinate: keyof IPosition, value: number) => {
      setPosition?.((prevPosition) => {
        const updatedPosition = { ...prevPosition };
        updatedPosition[coordinate] += value;
        return updatedPosition;
      });
    },
    [setPosition]
  );

  return (
    <main className="main">
      <DraggableContainer>
        <div className="categories">
          <div className="categories__main-item">
            <p>Categories</p>
            <button>&#43;</button>
          </div>
        </div>
      </DraggableContainer>
      <button className="scroll-btn scroll-up" onClick={() => arrowNavigationHandler('y', 50)}>
        &#708;
      </button>
      <button className="scroll-btn scroll-down" onClick={() => arrowNavigationHandler('y', -50)}>
        &#709;
      </button>
      <button className="scroll-btn scroll-left" onClick={() => arrowNavigationHandler('x', 50)}>
        &#706;
      </button>
      <button className="scroll-btn scroll-right" onClick={() => arrowNavigationHandler('x', -50)}>
        &#707;
      </button>
    </main>
  );
};
export default Categories;
