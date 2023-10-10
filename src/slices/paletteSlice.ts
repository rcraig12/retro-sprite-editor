import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { c64Pallete } from '../palette/c64';
//import { bbcPallete } from './palette/bbc';

interface Color {
  name: string;
  colorCode: string;
}

interface PaletteState {
  value: Color[]
}


const paletteInitialState: PaletteState = {
  value: c64Pallete
}

const paletteSlice = createSlice({
  name: 'palette',
  initialState: paletteInitialState,
  reducers: {
    addColor: (state, action: PayloadAction<Color>) => {
      state.value.push(action.payload);
    },
    removeColor: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(color => color.name !== action.payload);
    },
    updateColor: (state, action: PayloadAction<Color>) => {
      const index = state.value.findIndex(color => color.name === action.payload.name);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    changePalette: (state, action: PayloadAction<Color[]>) => {
      state.value = action.payload;
    }
  }
});

export const { addColor, removeColor, updateColor, changePalette } = paletteSlice.actions;
export default paletteSlice.reducer;