import React from 'react';

import './App.scss';
import TopBar from './components/TopBar';
import ToolBox from './components/ToolBox';
import Preview from './components/Preview';
import Palette from './components/Palette';
import Sheet from './components/Sheet';
import Editor from './components/Editor';


const App: React.FC = () => {
  
  return (
    <div>
      <TopBar />
      <div>
        <ToolBox />
        <Preview />
        <Palette />
        <Sheet />
        <Editor />
      </div>
    </div>
  );
}

export default App;
