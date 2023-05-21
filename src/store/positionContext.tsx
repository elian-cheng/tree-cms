export interface IPosition {
  x: number;
  y: number;
}

import {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useRef,
  useState,
} from 'react';

interface IPositionContextProps {
  position: IPosition;
  setPosition: Dispatch<SetStateAction<IPosition>>;
  scale: number;
  setScale: (scale: number | ((prevScale: number) => number)) => void;
  draggableRef: MutableRefObject<HTMLDivElement | null> | null;
}

export const PositionContext = createContext<IPositionContextProps>({
  position: { x: 0, y: 0 },
  draggableRef: null,
  scale: 1,
  setScale: () => {},
  setPosition: () => {},
});

export const PositionContextProvider = ({ children }: PropsWithChildren) => {
  const draggableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);

  const contextValue = {
    position,
    setPosition,
    draggableRef,
    scale,
    setScale,
  };
  return <PositionContext.Provider value={contextValue}>{children}</PositionContext.Provider>;
};
