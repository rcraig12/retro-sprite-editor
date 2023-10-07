import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedTool } from '../store';
import './ToolBox.scss';

interface ToolBoxProps {
  style?: React.CSSProperties;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

type Tool = 'pen' | 'eraser' | 'circle' | 'square' | 'line' | 'fill';

const ToolBox: React.FC<ToolBoxProps> = ({style, onMouseDown}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 70 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [selectedTool, setSelectedToolLocal] = useState<Tool>('pen');

  const dispatch = useDispatch();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (onMouseDown) onMouseDown(e as React.MouseEvent<HTMLDivElement>);
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

  const handleToolClick = (event: React.MouseEvent<HTMLDivElement>) => {

    event.preventDefault();
    const tool = (event.currentTarget as HTMLDivElement).dataset.tool as Tool;
    setSelectedToolLocal(tool);
    dispatch(setSelectedTool(tool));

  }

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
      id="toolbox" 
      className="toolbox" 
      style={{...style, position: 'absolute', left: position.x, top: position.y, zIndex: isDragging ? 100 : 1 }}
      onMouseDown={handleMouseDown}
    >
      <div className="toolbox-title">Toolbox</div>
      <div className="toolbox-outer">
        <div className="toolbox-tilerow">
          <div className={`toolbox-tilecol ${selectedTool === 'pen' ? 'selected' : ''}`} data-tool="pen" onClick={handleToolClick}>
            Pen
          </div>
          <div className={`toolbox-tilecol ${selectedTool === 'eraser' ? 'selected' : ''}`} data-tool="eraser" onClick={handleToolClick}>
            Eraser
          </div>
        </div>
        <div className="toolbox-tilerow">
          <div className={`toolbox-tilecol ${selectedTool === 'circle' ? 'selected' : ''}`} data-tool="circle" onClick={handleToolClick}>
            Circle
          </div>
          <div className={`toolbox-tilecol ${selectedTool === 'square' ? 'selected' : ''}`} data-tool="square" onClick={handleToolClick}>
            Square
          </div>
        </div>        
        <div className="toolbox-tilerow">
          <div className={`toolbox-tilecol ${selectedTool === 'line' ? 'selected' : ''}`} data-tool="line" onClick={handleToolClick}>
            Line
          </div>
          <div className={`toolbox-tilecol ${selectedTool === 'fill' ? 'selected' : ''}`} data-tool="fill" onClick={handleToolClick}>
            Fill
          </div>
        </div>        
      </div>
    </div>
  );
}

export default ToolBox;
