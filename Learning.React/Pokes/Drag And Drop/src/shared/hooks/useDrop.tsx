import { MutableRefObject, useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";
import useSessionStorage from "./useSessionStorage";

interface IUseDragParameters<T> {
  draggedElementKey : string,
  onDrop : (draggedElementsProps : T, event?: Event) => void
  onDragEnter? : (event?: Event) => void
  onDragOver? : (event?: Event) => void
  onDragLeave? : (event?: Event) => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dropReference : MutableRefObject<T>
  isOver : boolean
}

// Nécéssite d'être wrapper par un <DragAndDropContextProvider>
const useDrop = <T extends HTMLElement, Y>({
  draggedElementKey,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave
 } : IUseDragParameters<Y>) : IUseDragResponse<T> =>
{
  const [getDraggedElementProps, setDraggedElementProps] = useSessionStorage<Y | undefined>(`DRAGGED_ELEMENT_${draggedElementKey}`, undefined)

  const dropReference = useRef() as MutableRefObject<T>;
  const [isOver, setIsOver] = useState(false);

  const drop = (event: Event) => // Pour que ça fonctionne, pas de useCallback ici
  {
    setIsOver(false);
    onDrop?.(getDraggedElementProps()!, event);
    setDraggedElementProps(undefined)
  }
  const dragEnter = useCallback((event: Event) => { setIsOver(true); onDragEnter?.(event) }, []);
  const dragOver = useCallback((event: Event) => { event.stopPropagation(); event.preventDefault(); onDragOver?.(event) }, []);
  const dragLeave = useCallback((event: Event) => { setIsOver(false); onDragLeave?.(event); }, []);

  useEventListener('drop', drop, dropReference);
  useEventListener('dragenter', dragEnter, dropReference);
  useEventListener('dragover', dragOver, dropReference);
  useEventListener('dragleave', dragLeave, dropReference);

  return { dropReference, isOver }
}

export default useDrop