import { configureStore } from '@reduxjs/toolkit';

//slices

import totalSpritesSlice from './slices/totalSpritesSlice';
import platformSlice from './slices/platformSlice';
import paletteSlice from './slices/paletteSlice';
import spriteDimensionSlice from './slices/spriteDimensionSlice';
import cellSizeSlice from './slices/cellSizeSlice';
import selectedToolSlice from './slices/selectedToolSlice';
import selectedPenSlice from './slices/selectedPenSlice';
import gridDataSlice from './slices/gridDataSlice';

const store = configureStore({
  reducer: {
    totalSprites: totalSpritesSlice,
    platform: platformSlice,
    palette: paletteSlice,
    spriteDimension: spriteDimensionSlice,
    cellSize: cellSizeSlice,
    selectedTool: selectedToolSlice,
    selectedPen: selectedPenSlice,
    gridData: gridDataSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;