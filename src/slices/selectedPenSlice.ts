import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPenState {
  value: string;
}

const initialState: SelectedPenState = {
  value: '#000000',
};

const selectedPenSlice = createSlice({
  name: 'selectedPen',
  initialState,
  reducers: {
    setSelectedPen: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedPen } = selectedPenSlice.actions;
export default selectedPenSlice.reducer;
