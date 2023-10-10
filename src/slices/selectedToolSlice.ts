import { createSlice } from '@reduxjs/toolkit';

interface SelectedToolState {
  value: string
}

const selectedToolInitialState: SelectedToolState = {
  value: 'pen'
}

const selectedToolSlice = createSlice({
  name: 'selectedTool',
  initialState: selectedToolInitialState,
  reducers: {
    setSelectedTool: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setSelectedTool } = selectedToolSlice.actions;
export default selectedToolSlice.reducer;