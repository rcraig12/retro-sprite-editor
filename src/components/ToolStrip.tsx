import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import './ToolStrip.scss';

import {ReactComponent as NewIcon} from '../ui/icons/new.svg';
import {ReactComponent as SaveIcon} from '../ui/icons/save.svg';

import { addSprite } from '../slices/spriteLibrarySlice'; // Import the addSprite action
import { setSelectedSprite } from '../slices/selectedSpriteSlice';

const ToolStrip = () => {

  const dispatch = useDispatch();
  const penColour = useSelector((state: RootState) => state.selectedPen.value);
  const gridData = useSelector((state: RootState) => state.gridData.value);
  const spriteDimensionX = useSelector((state: RootState) => state.spriteDimension.value.x);
  const spriteDimensionY = useSelector((state: RootState) => state.spriteDimension.value.y);
  const selectedSprite = useSelector((state: RootState) => state.selectedSprite.value )

  const SaveSpriteHandler = () => {
    
    dispatch( setSelectedSprite(selectedSprite + 1));

    // Create a new sprite object with the gridData and index
    const newSprite = {
      gridData: gridData,
      spriteIndex: selectedSprite,
      width: spriteDimensionX,
      height: spriteDimensionY
    };

    // Dispatch the addSprite action to add the sprite to the store
    dispatch(addSprite(newSprite));
  }

  return (
    <div className="toolstrip">
      <div className="toolcontainer">
        <div className="toolouter noborder">
          <div className="svgIcon">
            <NewIcon />
          </div>
        </div>
      </div>
      <div className="toolcontainer">
        <div className="toolouter noborder"
          onClick={SaveSpriteHandler}
        >
          <div className="svgIcon">
            <SaveIcon />
          </div>
        </div>
      </div>
      <div className="toolcontainer">
      <div className="label">Pen</div>
        <div className="toolouter">
          <div className="colorbutton" style={{backgroundColor: penColour}}></div>
        </div>
      </div>
    </div>
  )
}

export default ToolStrip