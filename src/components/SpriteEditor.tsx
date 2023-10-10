import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGridData, drawCell } from '../slices/gridDataSlice';
import { RootState } from '../store'; 
import CanvasComponent from './CanvasComponent';

interface SpriteEditorProps {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
}

const SpriteEditor: React.FC<SpriteEditorProps> = ({ gridWidth, gridHeight, cellSize }) => {

  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const palette = useSelector((state: RootState) => state.palette.value);
  const selectedPen = useSelector((state: RootState) => state.selectedPen.value);
  const spriteDimensionX = useSelector((state: RootState) => state.spriteDimension.value.x);
  const spriteDimensionY = useSelector((state: RootState) => state.spriteDimension.value.y);
  const gridData = useSelector((state: RootState) => state.gridData.value)

  const initialGridData = useMemo(() => (
    Array(spriteDimensionY).fill(
      Array(spriteDimensionX).fill({ isDrawn: false, color: '#1b1b1b', byteIndex: 0 })
    )
  ), [spriteDimensionX, spriteDimensionY]);
  
  useEffect(() => {
    dispatch(setGridData(initialGridData));
  }, [dispatch, initialGridData]);
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    const rowIndex = Math.floor(y / cellSize);
    const colIndex = Math.floor(x / cellSize);

    const newByteIndex = palette.findIndex(p => p.colorCode === selectedPen);
    
    dispatch(drawCell({x: colIndex, y: rowIndex, color: selectedPen, byteIndex: newByteIndex}));

    const newGridData = gridData.map((row, ri) =>
      row.map((cell, ci) => 
        (ri === rowIndex && ci === colIndex) 
          ? { 
            isDrawn: true, color: selectedPen, byteIndex: newByteIndex 
          } 
          : cell
      )
    );
    dispatch(setGridData(newGridData));
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
            dispatch(setGridData(newGridData));
        }
    };

    updateGridWithNewPalette();
}, [palette, gridData, dispatch]);

  
  

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
