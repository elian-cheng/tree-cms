import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { IPosition, PositionContext } from '../../store/positionContext';

const DraggableContainer = ({ children }: PropsWithChildren) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const { position, setPosition, draggableRef, scale } = useContext(PositionContext);

  const headerHeight = 70;

  const mouseUpHandler = useCallback(() => {
    setIsDragging(false);
  }, []);

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          const x = e.clientX - clickPosition.x;
          let y = e.clientY - clickPosition.y;
          y = Math.max(y, headerHeight);
          setPosition?.({ x, y });
        });
      }
    },
    [clickPosition, isDragging, setPosition]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
    } else {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [isDragging, mouseMoveHandler, mouseUpHandler]);

  const mouseDownHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setClickPosition({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
      setIsDragging(true);
    },
    [position]
  );

  return (
    <div
      ref={draggableRef}
      className="draggable__wrapper"
      onMouseDown={mouseDownHandler}
      style={{
        top: position.y,
        left: position.x,
        transform: `scale(${scale})`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableContainer;
