import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragAndDropWithDnd from "./components/DragAndDropWithDnd/DragAndDropWithDnd";
import DragAndDropWithoutAnyLibrary from "./components/DragAndDropWithoutAnyLibrary/DragAndDropWithoutAnyLibrary";

const App = () => <DndProvider backend={HTML5Backend}>
  <div style={{ display : 'flex', gap : '12px' }}>
    <DragAndDropWithDnd/> { /* Provoque des erreurs dans la console */ }
    <DragAndDropWithoutAnyLibrary/>
  </div>
</DndProvider>

export default App;
