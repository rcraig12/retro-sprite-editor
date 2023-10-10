import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpriteDimension {
  x: number;
  y: number;
}

interface SpriteSizeState {
  value: SpriteDimension
}

const spriteDimensionInitialState: SpriteSizeState = {
  value: { x: 24, y: 21 }
}

const spriteDimensionSlice = createSlice({
  name: 'spriteDimension',
  initialState: spriteDimensionInitialState,
  reducers: {
    setSpriteDimensionX: (state, action: PayloadAction<number>) => {
      state.value.x = action.payload;
    },
    setSpriteDimensionY: (state, action: PayloadAction<number>) => {
      state.value.y = action.payload;
    },
  },
});

export const { setSpriteDimensionX, setSpriteDimensionY } = spriteDimensionSlice.actions;
export default spriteDimensionSlice.reducer;