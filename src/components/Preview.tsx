import React, { useState, useEffect, useCallback } from 'react';
import './Preview.scss';

interface PreviewProps {
  style?: React.CSSProperties;
}

const Preview: React.FC<PreviewProps> = ({ style }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 70 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

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
            Sprite
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview;
