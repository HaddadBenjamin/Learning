import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragAndDropWithoutLibrary from "./components/DragAndDropWithDnd/DragAndDropWithoutLibrary";

const App = () => <DndProvider backend={HTML5Backend}>
  <DragAndDropWithoutLibrary/>
</DndProvider>

export default App;
