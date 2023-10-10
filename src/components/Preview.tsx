import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './Preview.scss';

interface PreviewProps {
  style?: React.CSSProperties;
}

const Preview: React.FC<PreviewProps> = ({ style }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 70 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const gridData = useSelector((state: RootState) => state.gridData.value);
  const spriteDimensionX = useSelector((state: RootState) => state.spriteDimension.value.x);
  const spriteDimensionY = useSelector((state: RootState) => state.spriteDimension.value.y);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setLastMousePosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

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

  const drawSprite = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let y = 0; y < spriteDimensionY; y++) {
      for (let x = 0; x < spriteDimensionX; x++) {
        const pixel = gridData[y] && gridData[y][x];
        if (pixel && pixel.isDrawn ) {
          ctx.fillStyle = pixel.color;
          ctx.fillRect(x * 2, y * 2, 2, 2);
        }
      }
    }
  }, [spriteDimensionX, spriteDimensionY, gridData]);

  useEffect(() => {

      drawSprite();
    
  },[drawSprite]);

  return (
    <div 
      id="preview" 
      className="preview" 
      style={{ ...style, position: 'absolute', left: position.x, top: position.y, zIndex: isDragging ? 100 : 1 }}
      onMouseDown={handleMouseDown}
    >
      <div className="preview-title">Preview</div>
      <div className="preview-outer">
        <div className="preview-row">
          <div className="preview-col">
          <canvas 
              ref={canvasRef} 
              width={spriteDimensionX * 2} 
              height={spriteDimensionY * 2} 
              style={{ imageRendering: 'pixelated' }} // Ensures that the canvas scaling appears as "blocky" pixels rather than being smoothed/anti-aliased
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview;
