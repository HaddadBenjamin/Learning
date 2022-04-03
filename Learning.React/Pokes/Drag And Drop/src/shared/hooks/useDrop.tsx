import { MutableRefObject, useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";
import useSessionStorage from "./useSessionStorage";

interface IUseDragParameters<T> {
  onDrop? : (draggedElementsProps : T, event?: Event) => void
  onDragEnter? : (draggedElementsProps : T, event?: Event) => void
  onDragOver? : (draggedElementsProps : T, event?: Event) => void
  onDragLeave? : (draggedElementsProps : T, event?: Event) => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dropReference : MutableRefObject<T>
  isOver : boolean
}

const useDrop = <T extends HTMLElement, Y>({
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave
 } : IUseDragParameters<Y>) : IUseDragResponse<T> =>
{
  const [getDraggedElementProps, setDraggedElementProps] = useSessionStorage<Y | undefined>(`DRAGGED_ELEMENT`, undefined)

  const dropReference = useRef() as MutableRefObject<T>;
  const [isOver, setIsOver] = useState(false);

  const drop = (event: Event) => // Pour que ça fonctionne, pas de useCallback ici
  {
    setIsOver(false);
    onDrop?.(getDraggedElementProps()!, event);
    setDraggedElementProps(undefined)
  }
  const dragEnter = useCallback((event: Event) => { setIsOver(true); onDragEnter?.(getDraggedElementProps()!, event) }, []);
  const dragOver = useCallback((event: Event) => { event.stopPropagation(); event.preventDefault(); onDragOver?.(getDraggedElementProps()!, event) }, []);
  const dragLeave = useCallback((event: Event) => { setIsOver(false); onDragLeave?.(getDraggedElementProps()!, event); }, []);

  useEventListener('drop', drop, dropReference);
  useEventListener('dragenter', dragEnter, dropReference);
  useEventListener('dragover', dragOver, dropReference);
  useEventListener('dragleave', dragLeave, dropReference);

  return { dropReference, isOver }
}

export default useDrop