import { configureStore } from '@reduxjs/toolkit';

//slices

import totalSpritesSlice from './slices/totalSpritesSlice';
import platformSlice from './slices/platformSlice';
import paletteSlice from './slices/paletteSlice';
import spriteDimensionSlice from './slices/spriteDimensionSlice';
import cellSizeSlice from './slices/cellSizeSlice';
import selectedToolSlice from './slices/selectedToolSlice';
import selectedPenSlice from './slices/selectedPenSlice';
import selectedSpriteSlice from './slices/selectedSpriteSlice';
import gridDataSlice from './slices/gridDataSlice';
import spriteLibrarySlice from './slices/spriteLibrarySlice';
import zIndexManagerSlice from './slices/zIndexManagerSlice';

const store = configureStore({
  reducer: {
    totalSprites: totalSpritesSlice,
    platform: platformSlice,
    palette: paletteSlice,
    spriteDimension: spriteDimensionSlice,
    cellSize: cellSizeSlice,
    selectedTool: selectedToolSlice,
    selectedPen: selectedPenSlice,
    selectedSprite: selectedSpriteSlice,
    gridData: gridDataSlice,
    spriteLibrary: spriteLibrarySlice,
    zIndex: zIndexManagerSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;