import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedSpriteState {
  value: number;
}

const initialState: SelectedSpriteState = {
  value: 0,
};

const selectedSpriteSlice = createSlice({
  name: 'selectedSprite',
  initialState,
  reducers: {
    setSelectedSprite: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedSprite } = selectedSpriteSlice.actions;
export default selectedSpriteSlice.reducer;