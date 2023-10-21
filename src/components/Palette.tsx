import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'; // Replace with your actual path
import { Dragging, Dropped } from '../slices/zIndexManagerSlice';
import { setSelectedPen } from '../slices/selectedPenSlice'; // Replace with your actual path

import './Palette.scss';

interface PaletteProps {
  style?: React.CSSProperties;
}

const Palette: React.FC<PaletteProps> = ({style}) => {

  const colors = useSelector((state: RootState) => state.palette.value);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 320 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const zIndex = useSelector((state: RootState) => state.zIndex.components.palette);

  const dispatch = useDispatch();

  const handleMouseDown = (e: React.MouseEvent) => {
    setLastMousePosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    dispatch(Dragging('palette'));
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dispatch(Dropped('palette'));
  }, [dispatch]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    setPosition(prevPos => ({ x: prevPos.x + dx, y: prevPos.y + dy }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePosition]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  const chunkIntoPairs = (arr: typeof colors) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };
  const colorPairs = chunkIntoPairs(colors);

  const handlePaletteClick = (event: React.MouseEvent<HTMLDivElement>) => {

    event.preventDefault();
    const colour: string = (event.currentTarget as HTMLDivElement).dataset.colour as string;
    dispatch(setSelectedPen(colour))

  }
  
  return (
    <div 
      id="palette" 
      className="palette" 
      style={{...style, position: 'absolute', left: position.x, top: position.y, zIndex: zIndex }}
      onMouseDown={handleMouseDown}
    >
      <div className="palette-title">Palette</div>
      <div className="palette-outer">
        {colorPairs.map((pair, rowIndex) => (
          <div className="palette-row" key={rowIndex}>
            {pair.map((color, colIndex) => (
              <div 
                className="palette-col" 
                key={colIndex} 
                style={{backgroundColor: color.colorCode as string}}
                data-colour={color.colorCode as string} onClick={handlePaletteClick}
              >
                {color.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Palette;
