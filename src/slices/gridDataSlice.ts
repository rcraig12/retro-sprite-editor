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
    // Potentially more reducers...
  },
});

export const { setGridData } = gridDataSlice.actions;
export default gridDataSlice.reducer;
