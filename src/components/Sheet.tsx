import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeSprite } from '../slices/spriteLibrarySlice';
import { Dragging, Dropped } from '../slices/zIndexManagerSlice';

import Window from './Window';

import './Sheet.scss';

interface SheetProps {
  style?: React.CSSProperties;
}

interface GridCell {
  isDrawn: boolean;
  color: string;
  byteIndex: number;
}

interface Sprite {
  spriteIndex: number;
  width: number;
  height: number;
  gridData: GridCell[][];
}

const Sheet: React.FC<SheetProps> = ({ style }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 180 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const sprites = useSelector((state: RootState) => state.spriteLibrary.sprites);
  const zIndex = useSelector((state: RootState) => state.zIndex.components.sheet);
  //const canvasRefs: (React.RefObject<HTMLCanvasElement | null> | null)[] = [];

  const canvasRefs: (React.RefObject<HTMLCanvasElement | null> | null)[] = useMemo(() => {
    const refs: (React.RefObject<HTMLCanvasElement | null> | null)[] = [];
    for (let i = 0; i < sprites.length; i++) {
      refs.push(React.createRef<HTMLCanvasElement | null>());
    }
    return refs;
  }, [sprites]);

  for (let i = 0; i < sprites.length; i++) {
    canvasRefs.push(React.createRef<HTMLCanvasElement | null>());
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setLastMousePosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    dispatch(Dragging('sheet'));
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dispatch(Dropped('sheet'));
  }, [dispatch]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    setPosition((prevPos) => ({ x: prevPos.x + dx, y: prevPos.y + dy }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePosition]);

  const drawSprite = useCallback(
    (sprite: Sprite, index: number) => {
      const canvasRef = canvasRefs[index];
      if (!canvasRef || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      for (let y = 0; y < sprite.height; y++) {
        for (let x = 0; x < sprite.width; x++) {
          const pixel = sprite.gridData[y] && sprite.gridData[y][x];
          if (pixel && pixel.isDrawn) {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(x * 2, y * 2, 2, 2);
          }
        }
      }
    },
    [canvasRefs]
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  useEffect(() => {
    // Call drawSprite for each sprite when sprites change
    sprites.forEach((sprite, index) => {
      drawSprite(sprite, index);
    });
  }, [sprites, drawSprite]);

  return (
    <Window
      id="sheet"
      style={{
        ...style,
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: zIndex,
      }}
      title="Sprite Sheet"
      onMouseDown={handleMouseDown}
    >
      <div className="sheet-row">
        {sprites.map((sprite, index) => (
          <div className="spriteslide">
            <div className="sprite-container">
              <div className="sprite-index">{sprite.spriteIndex}</div>
              <div className="remove-sprite">
                <div className="close" onClick={() => dispatch(removeSprite(sprite.spriteIndex))}>x</div>
              </div>
            </div>
            <div className="spriteslideinner">
          
          <div key={index} className="sprite">
            
            
            {canvasRefs[index] && (
              <canvas
                ref={canvasRefs[index] as React.RefObject<HTMLCanvasElement>}
                width={sprite.width * 2}
                height={sprite.height * 2}
              />
            )}
          </div>
          </div>
          </div>
        ))}
      </div>
      
    </Window>
  );
};

export default Sheet;
