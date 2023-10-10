import { createSlice } from '@reduxjs/toolkit';

interface PlatformState {
  value: String;
}

const platformInitialState: PlatformState = {
  value: 'C64'
}
const platformSlice = createSlice({
  name: 'platform',
  initialState: platformInitialState,
  reducers: {
    setPlatform: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setPlatform } = platformSlice.actions;
export default platformSlice.reducer;