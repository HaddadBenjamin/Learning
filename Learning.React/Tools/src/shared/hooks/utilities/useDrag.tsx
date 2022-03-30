import { MutableRefObject, useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";
import useSessionStorage from "./useSessionStorage";

interface IUseDragParameters<T> {
  draggedElementKey : string,
  getDraggedElementProps : () => T,
  onDragStart? : (event?: Event) => void
  onDragging? : (event?: Event) => void
  onDragEnd? : (event?: Event) => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dragReference : MutableRefObject<T>
  isDragging : boolean
}

// Nécéssite d'être wrapper par un <DragAndDropContextProvider>
const useDrag = <T extends HTMLElement, Y>({
  draggedElementKey,
  getDraggedElementProps,
  onDragStart,
  onDragging,
  onDragEnd
 } : IUseDragParameters<Y>) : IUseDragResponse<T> =>
{
  const [, setDraggedElementProps] = useSessionStorage<Y | undefined>(`DRAGGED_ELEMENT_${draggedElementKey}`, undefined)

  const dragReference = useRef() as MutableRefObject<T>;
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback((event: Event) =>
  {
    event.stopPropagation();
    setIsDragging(true);
    onDragStart?.(event);
  }, []);

  const dragging = useCallback((event: Event) =>
  {
    event.stopPropagation();
    event.preventDefault();
    onDragging?.(event);
  }, []);

  const stopDragging = useCallback((event: Event) =>
  {
    event.stopPropagation();
    setIsDragging(false);
    setDraggedElementProps(getDraggedElementProps())
    onDragEnd?.(event);
  }, []);

  useEventListener('dragstart', startDragging, dragReference);
  useEventListener('dragend', stopDragging, dragReference);
  useEventListener('dragover', dragging, dragReference);

  return { dragReference, isDragging }
}

export default useDrag