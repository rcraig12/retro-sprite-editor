import React, {ChangeEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlatform } from '../slices/platformSlice';
import { changePalette } from '../slices/paletteSlice';
import { setSpriteDimensionX, setSpriteDimensionY } from '../slices/spriteDimensionSlice';
import { RootState } from '../store';

import { c64Pallete } from '../palette/c64';
import { bbcPallete } from '../palette/bbc';

import './TopBar.scss'

const TopBar = () => {

  const dispatch = useDispatch();
  const platform = useSelector((state: RootState) => state.platform.value);

  const handlePlatformChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPlatform(event.target.value));

    if (event.target.value === 'C64') {

      dispatch(changePalette(c64Pallete));
      dispatch(setSpriteDimensionX(24));
      dispatch(setSpriteDimensionY(21));
      

    } else if(event.target.value === 'BBC') {

      dispatch(changePalette(bbcPallete));
      dispatch(setSpriteDimensionX(8));
      dispatch(setSpriteDimensionY(8));

    }

  };

  return (
    <div className="topbar">
      <h1 className="topbar-h1">Retro Sprite Editor</h1>
      <button onClick={() => {/* Load sprite data */}}>Load Sprites</button>
      <button onClick={() => {/* Save sprite data */}}>Save Sprites</button>
      <label htmlFor="platform">Platform</label>
      <select id="platform" name="platform" value={String(platform)} onChange={handlePlatformChange}>
        <option value="C64">C64</option>
        <option value="BBC">BBC</option>
      </select>
    </div>
  );
}

export default TopBar;
