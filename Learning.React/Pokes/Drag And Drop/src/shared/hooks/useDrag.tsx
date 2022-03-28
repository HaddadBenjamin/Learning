import {MutableRefObject, useCallback, useRef, useState} from "react";
import useEventListener from "./useEventListener";

interface IUseDragParameters {
  onDragStart? : () => void
  onDragging? : () => void
  onDragEnd? : () => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dragReference : MutableRefObject<T>,
  isDragging : boolean
}

const useDrag = <T extends HTMLElement>({
  onDragStart,
  onDragging,
  onDragEnd
 } : IUseDragParameters) : IUseDragResponse<T> => {
  const dragReference = useRef() as MutableRefObject<T>
  const [isDragging, setIsDragging] = useState(false)

  const startDragging = useCallback(() => {
    setIsDragging(true);
    onDragStart?.()
  }, [])

  const dragging = useCallback((event: Event) => {
    event.preventDefault()
    onDragging?.();
  }, [])

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    onDragEnd?.()
  }, [])

  useEventListener('dragstart', startDragging, dragReference)
  useEventListener('dragend', stopDragging, dragReference)
  useEventListener('dragover', dragging, dragReference)

  return { dragReference, isDragging }
}

export default useDrag