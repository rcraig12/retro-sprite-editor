import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GridCell {
  isDrawn: boolean;
  color: string;
  byteIndex: number;
}

interface GridDataState {
  value: GridCell[][];
}

const initialState: GridDataState = {
  value: [[]] // Your initial grid data or an empty array
};

const gridDataSlice = createSlice({
  name: 'gridData',
  initialState,
  reducers: {
    setGridData: (state, action: PayloadAction<GridCell[][]>) => {
      state.value = action.payload;
    },
    drawCell: (state, action: PayloadAction<{x: number, y: number, color: string, byteIndex: number}>) => {
      const {x, y, color, byteIndex} = action.payload;
      // Make sure you're not trying to modify a cell that doesn't exist.
      if (state.value[y] && state.value[y][x]) {
        state.value[y][x] = { isDrawn: true, color, byteIndex };
      }
    },
  },
});

export const { setGridData, drawCell } = gridDataSlice.actions;
export default gridDataSlice.reducer;
