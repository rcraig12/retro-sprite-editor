import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import './ToolStrip.scss';

const ToolStrip = () => {

  const dispatch = useDispatch();
  const penColour = useSelector((state: RootState) => state.selectedPen.value);

  return (
    <div className="toolstrip">
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