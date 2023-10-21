import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ZIndexState {
  components: Record<string, number>; // Store z-index values for all components
}

const initialZIndexValues: Record<string, number> = {
  toolbox: 1, 
  palette: 2, 
  preview: 3, 
  sheet: 4, 
  editor: 5 
};

const initialState: ZIndexState = {
  components: { ...initialZIndexValues },
};

const zIndexManagerSlice = createSlice({
  name: 'zIndex',
  initialState: initialState,
  reducers: {
    Dragging: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.components[key] = Math.max(...Object.values(state.components)) + 1;
    },
    Dropped: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      const sortedComponents = Object.keys(state.components).sort((a, b) => state.components[a] - state.components[b]);
      const droppedIndex = sortedComponents.indexOf(key);
      sortedComponents.splice(droppedIndex, 1);
      state.components = {
        ...Object.fromEntries(sortedComponents.map((k, i) => [k, i + 1])),
        [key]: sortedComponents.length + 1,
      };
    },
  },
});

export const {
  Dragging,
  Dropped
} = zIndexManagerSlice.actions;

export default zIndexManagerSlice.reducer;
