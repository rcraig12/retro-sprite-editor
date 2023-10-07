import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

import './CanvasComponent.scss'

interface CanvasProps {
  width: number;
  height: number;
  onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}

const CanvasComponent: React.ForwardRefRenderFunction<HTMLCanvasElement, CanvasProps> = 
  ({ width, height, onMouseDown, onMouseMove, onMouseUp, onMouseLeave }, ref) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Expose the canvasRef to parent components
  useImperativeHandle(ref, () => canvasRef.current!);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    // Your drawing logic here...
    context.clearRect(0, 0, width, height);

  }, [width, height]);

  return (
    <div id="canvasContainer">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
};

export default forwardRef(CanvasComponent);
