import React, {FC, useState} from 'react';
import { IDraggable } from "../model";
import useSessionStorage from "../../shared/hooks/useSessionStorage";

interface IDragAndDropContextState {
  draggedElement: () => (IDraggable | undefined)
  setDraggedElement? : (draggable : IDraggable) => void
}

export const DragAndDropContext = React.createContext<IDragAndDropContextState>({ draggedElement : () => undefined})
export const DragAndDropContextProvider : FC = ({ children }) => {
  const [draggedElement, setDraggedElement] = useSessionStorage<IDraggable|undefined>('draggedElement', undefined)

  return <DragAndDropContext.Provider value={{ draggedElement, setDraggedElement }}>
    {children}
  </DragAndDropContext.Provider>
}

