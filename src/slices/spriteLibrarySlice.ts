import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GridCell {
  isDrawn: boolean;
  color: string;
  byteIndex: number;
}

interface Color {
  name: string;
  colorCode: string;
}

interface Sprite {
  gridData: GridCell[][];
  spriteIndex: number;
  width: number;
  height: number;
}

interface SpriteLibraryState {
  sprites: Sprite[];
}

const initialState: SpriteLibraryState = {
  sprites: [],
};

const spriteLibrarySlice = createSlice({
  name: 'spriteLibrary',
  initialState,
  reducers: {
    addSprite: (state, action: PayloadAction<Sprite>) => {
      state.sprites.push(action.payload);
    },
    removeSprite: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      state.sprites = state.sprites.filter(
        (sprite) => sprite.spriteIndex !== indexToRemove
      );
    },
    updateSprite: (
      state,
      action: PayloadAction<{ spriteIndex: number; gridData: GridCell[][] }>
    ) => {
      const { spriteIndex, gridData } = action.payload;
      const spriteToUpdate = state.sprites.find(
        (sprite) => sprite.spriteIndex === spriteIndex
      );
      if (spriteToUpdate) {
        spriteToUpdate.gridData = gridData;
      }
    },
  },
});

export const { addSprite, removeSprite, updateSprite } = spriteLibrarySlice.actions;
export default spriteLibrarySlice.reducer;
