import React, { PropsWithChildren, useRef } from 'react';

const DraggableContainer = ({ children }: PropsWithChildren) => {
  const draggableRef = useRef<HTMLDivElement>(null);

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = draggableRef.current!;
    if (!element) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = startDragging;

    function startDragging(e: MouseEvent) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = element.offsetTop - pos2 + 'px';
      element.style.left = element.offsetLeft - pos1 + 'px';
    }

    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  return (
    <div ref={draggableRef} className="draggable__wrapper">
      <div className="draggable__element" onMouseDown={mouseDownHandler}>
        {children}
      </div>
    </div>
  );
};

export default DraggableContainer;
