import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragAndDropWithoutAnyLibrary2 from "./components/DragAndDropWithoutAnyLibrary2/DragAndDropWithoutAnyLibrary2";
import DragAndDropWithoutAnyLibrary from "./components/DragAndDropWithoutAnyLibrary/DragAndDropWithoutAnyLibrary";
import BeautifulDnd from "./components/DragAndDropWithBeautifulDnd/BeautifulDnd";
import DragAndDropWithDnd from "./components/DragAndDropWithDnd/DragAndDropWithDnd";

const App = () => <DndProvider backend={HTML5Backend}>
  <div style={{ display : 'flex', gap : '12px' }}>
    { /* Provoque des erreurs dans la console */ }
    <DragAndDropWithoutAnyLibrary/>
    <DragAndDropWithoutAnyLibrary2/>
    <DragAndDropWithDnd/>
    <BeautifulDnd/>
  </div>
</DndProvider>

export default App;
