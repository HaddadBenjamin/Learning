import React, {FC, useState} from 'react';
import { IDraggable } from "../model";
import useSessionStorage from "../../shared/hooks/useSessionStorage";

interface IDragAndDropContextState {
  getDraggedElement: () => (IDraggable | undefined)
  setDraggedElement? : (draggable : IDraggable) => void
}

export const DragAndDropContext = React.createContext<IDragAndDropContextState>({ getDraggedElement : () => undefined})
export const DragAndDropContextProvider : FC = ({ children }) => {
  const [draggedElement, setDraggedElement] = useSessionStorage<IDraggable|undefined>('draggedElement', undefined)

  return <DragAndDropContext.Provider value={{ getDraggedElement: draggedElement, setDraggedElement }}>
    {children}
  </DragAndDropContext.Provider>
}

