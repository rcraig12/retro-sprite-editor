import React from 'react'

import './Window.scss'

interface WindowProps {
  style?: React.CSSProperties;
  id?: string;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  title: String;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({children, title, id, style, onMouseDown}) => {
  return (
    <div id={id} className="window" style={style}  onMouseDown={onMouseDown}>
      <div className="window-title">{title}</div>
      {children}
    </div>
  )
}

export default Window