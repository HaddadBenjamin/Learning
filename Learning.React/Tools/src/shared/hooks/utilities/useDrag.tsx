import { MutableRefObject, useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";

interface IUseDragParameters {
  onDragStart? : (event?: Event) => void
  onDragging? : (event?: Event) => void
  onDragEnd? : (event?: Event) => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dragReference : MutableRefObject<T>
  isDragging : boolean
}

// Nécéssite d'être wrapper par un <DragAndDropContextProvider>
const useDrag = <T extends HTMLElement>({
  onDragStart,
  onDragging,
  onDragEnd
 } : IUseDragParameters) : IUseDragResponse<T> =>
{
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
    onDragEnd?.(event);
  }, []);

  useEventListener('dragstart', startDragging, dragReference);
  useEventListener('dragend', stopDragging, dragReference);
  useEventListener('dragover', dragging, dragReference);

  return { dragReference, isDragging }
}

export default useDrag