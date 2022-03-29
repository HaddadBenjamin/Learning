import React, {FC, useState} from 'react';
import { IDraggable } from "../model";

interface IDragAndDropContextState {
  draggedElement? : IDraggable
  setDraggedElement? : (draggable : IDraggable) => void
}

export const DragAndDropContext = React.createContext<IDragAndDropContextState>({})
export const DragAndDropContextProvider : FC = ({ children }) => {
  const [draggedElement, setDraggedElement] = useState<IDraggable|undefined>()

  return <DragAndDropContext.Provider value={{ draggedElement, setDraggedElement }}>
    {children}
  </DragAndDropContext.Provider>
}

