import React from 'react';
import DragAndDropWithoutLibrary from "./components/DragAndDropWithoutLibrary/DragAndDropWithoutLibrary";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => <DndProvider backend={HTML5Backend}>
  <DragAndDropWithoutLibrary/>
</DndProvider>

export default App;
