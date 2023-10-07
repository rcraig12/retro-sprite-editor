import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 
import CanvasComponent from './CanvasComponent';

interface SpriteEditorProps {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
}

interface GridCell {
  isDrawn: boolean;
  color: string;
  byteIndex: number;
}

const SpriteEditor: React.FC<SpriteEditorProps> = ({ gridWidth, gridHeight, cellSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const palette = useSelector((state: RootState) => state.palette.value);
  const selectedPen = useSelector((state: RootState) => state.selectedPen.value);

  const initialGridData = Array(gridHeight).fill(
    Array(gridWidth).fill({ isDrawn: false, color: '', byteIndex: 0 })
  );

  const [gridData, setGridData] = useState<GridCell[][]>(initialGridData);

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    const rowIndex = Math.floor(y / cellSize);
    const colIndex = Math.floor(x / cellSize);

    const newByteIndex = palette.findIndex(p => p.colorCode === selectedPen);
    
    const newGridData = gridData.map((row, ri) =>
      row.map((cell, ci) => 
        (ri === rowIndex && ci === colIndex) 
          ? { isDrawn: true, color: selectedPen, byteIndex: newByteIndex } 
          : cell
      )
    );
    setGridData(newGridData);
  };

  // Handle mouse events...
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrawing(true);
    draw(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDrawing) return;
    draw(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = gridWidth * cellSize;
    canvas.height = gridHeight * cellSize;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#1b1b1b';
    context.fillRect(0, 0, canvas.width, canvas.height);

    gridData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        context.fillStyle = cell.isDrawn ? cell.color : '#1b1b1b';
        context.fillRect(
          colIndex * cellSize,
          rowIndex * cellSize,
          cellSize,
          cellSize
        );
      });
    });

    context.strokeStyle = '#444444';
    context.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += cellSize) {
      context.moveTo(x + 0.5, 0);
      context.lineTo(x + 0.5, canvas.height);
    }

    for (let y = 0; y <= canvas.height; y += cellSize) {
      context.moveTo(0, y + 0.5);
      context.lineTo(canvas.width, y + 0.5);
    }

    context.stroke();
  }, [gridData, canvasRef, cellSize, gridWidth, gridHeight]);

  useEffect(() => {
    const updateGridWithNewPalette = () => {
        const newGridData = gridData.map(row =>
            row.map(cell => {
                // Keep the same byteIndex, but update the color according to the current palette
                return {
                    ...cell,
                    color: palette[cell.byteIndex]?.colorCode ?? cell.color,
                };
            })
        );

        // If there’s an actual update, update the grid data state
        if (JSON.stringify(newGridData) !== JSON.stringify(gridData)) {
            setGridData(newGridData);
        }
    };

    updateGridWithNewPalette();
}, [palette, gridData]);

  
  

  return (
    <CanvasComponent
      ref={canvasRef}
      width={gridWidth * cellSize}
      height={gridHeight * cellSize}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default SpriteEditor;
