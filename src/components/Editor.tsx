import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Window from './Window';
import ToolStrip from './ToolStrip';
import SpriteEditor from './SpriteEditor';
import { RootState } from '../store';
import './Editor.scss';

interface EditorProps {
  style?: React.CSSProperties;
}

const Editor: React.FC<EditorProps> = ({ style }) => {
  const { x: gridWidth, y: gridHeight } = useSelector((state: RootState) => state.spriteDimension.value);
  const cellSize  = useSelector((state: RootState) => state.cellSize.value);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 200, y: 320 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setLastMousePosition({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    setPosition(prevPos => ({ x: prevPos.x + dx, y: prevPos.y + dy }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <Window 
        id="editor" 
        style={{...style, position: 'absolute', left: position.x, top: position.y, zIndex: isDragging ? 100 : 1 }} 
        title="Sprite Editor" 
        onMouseDown={onMouseDown}
      >
        <ToolStrip />
        <SpriteEditor
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          cellSize={cellSize}
        />
      </Window>
    </>
  );
};

export default Editor;
