import { createSlice } from '@reduxjs/toolkit';

interface CellSizeState {
  value: number;
}

const cellSizeInitialState: CellSizeState = {
  value: 20
}

const cellSizeSlice = createSlice({
  name: 'cellSize',
  initialState: cellSizeInitialState,
  reducers: {
    setCellSize: (state, action) => {
      state.value = action.payload;
    }
  }
});


export const { setCellSize } = cellSizeSlice.actions;
export default cellSizeSlice.reducer;