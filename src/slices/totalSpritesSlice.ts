import { createSlice } from '@reduxjs/toolkit';

interface TotalSpritesState {
  value: number;
}

const totalSpritesInitialState: TotalSpritesState = {
  value: 0
};

const totalSpritesSlice = createSlice({
  name: 'totalSprites',
  initialState: totalSpritesInitialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});


export const { increment, decrement } = totalSpritesSlice.actions;
export default totalSpritesSlice.reducer;