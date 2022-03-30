import { MutableRefObject, useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";

interface IUseDragParameters {
  onDrop : (event?: Event) => void
  onDragEnter? : (event?: Event) => void
  onDragOver? : (event?: Event) => void
  onDragLeave? : (event?: Event) => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dropReference : MutableRefObject<T>
  isOver : boolean
}

// Nécéssite d'être wrapper par un <DragAndDropContextProvider>
const useDrop = <T extends HTMLElement>({
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave
 } : IUseDragParameters) : IUseDragResponse<T> =>
{
  const dropReference = useRef() as MutableRefObject<T>;
  const [isOver, setIsOver] = useState(false);

  const drop = useCallback((event: Event) => onDrop?.(event), []);
  const dragEnter = useCallback((event: Event) => { setIsOver(true); onDragEnter?.(event); }, []);
  const dragOver = useCallback((event: Event) => { event.preventDefault(); onDragOver?.(event); }, []);
  const dragLeave = useCallback((event: Event) => { setIsOver(false); onDragLeave?.(event); }, []);

  useEventListener('drop', drop, dropReference);
  useEventListener('dragenter', dragEnter, dropReference);
  useEventListener('dragover', dragOver, dropReference);
  useEventListener('dragleave', dragLeave, dropReference);

  return { dropReference, isOver }
}

export default useDrop