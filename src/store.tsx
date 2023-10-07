import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { c64Pallete } from './palette/c64';
//import { bbcPallete } from './palette/bbc';

interface TotalSpritesState {
  value: number;
}

interface PlatformState {
  value: String;
}

interface Color {
  name: string;
  colorCode: string;
}

interface PaletteState {
  value: Color[]
}

interface SpriteDimension {
  x: number;
  y: number;
}

interface SpriteSizeState {
  value: SpriteDimension
}

interface CellSizeState {
  value: number;
}

interface SelectedToolState {
  value: string
}

interface SelectedPenState {
  value: string;
}

const selectedPenInitialState: SelectedPenState = {
  value: '#000000'
}

const selectedToolInitialState: SelectedToolState = {
  value: 'pen'
}

const cellSizeInitialState: CellSizeState = {
  value: 20
}

const totalSpritesInitialState: TotalSpritesState = {
  value: 0
};

const platformInitialState: PlatformState = {
  value: 'C64'
}

const paletteInitialState: PaletteState = {
  value: c64Pallete
}

const spriteDimensionInitialState: SpriteSizeState = {
  value: { x: 24, y: 21 }
}

const selectedPenSlice = createSlice({
  name: 'selectedPen',
  initialState: selectedPenInitialState,
  reducers: {
    setSelectedPen: (state, action) => {
      state.value = action.payload;
    }
  }
});

const selectedToolSlice = createSlice({
  name: 'selectedTool',
  initialState: selectedToolInitialState,
  reducers: {
    setSelectedTool: (state, action) => {
      state.value = action.payload;
    }
  }
});

const cellSizeSlice = createSlice({
  name: 'cellSize',
  initialState: cellSizeInitialState,
  reducers: {
    setCellSize: (state, action) => {
      state.value = action.payload;
    }
  }
});

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

const platformSlice = createSlice({
  name: 'platform',
  initialState: platformInitialState,
  reducers: {
    setPlatform: (state, action) => {
      state.value = action.payload;
    }
  }
});

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

export const { increment, decrement } = totalSpritesSlice.actions;
export const { setPlatform } = platformSlice.actions;
export const { addColor, removeColor, updateColor, changePalette } = paletteSlice.actions;
export const { setSpriteDimensionX, setSpriteDimensionY } = spriteDimensionSlice.actions;
export const { setCellSize } = cellSizeSlice.actions;
export const { setSelectedTool } = selectedToolSlice.actions;
export const { setSelectedPen } = selectedPenSlice.actions;

const store = configureStore({
  reducer: {
    totalSprites: totalSpritesSlice.reducer,
    platform: platformSlice.reducer,
    palette: paletteSlice.reducer,
    spriteDimension: spriteDimensionSlice.reducer,
    cellSize: cellSizeSlice.reducer,
    selectedTool: selectedToolSlice.reducer,
    selectedPen: selectedPenSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;