import { MutableRefObject, useCallback, useRef, useState } from "react";
import useEventListener from "./useEventListener";

interface IUseDragParameters {
  onDrop : () => void
  onDragEnter? : () => void
  onDragOver? : () => void
  onDragLeave? : () => void
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

  const drop = useCallback(() => onDrop?.(), []);
  const dragEnter = useCallback(() => { setIsOver(true); onDragEnter?.(); }, []);
  const dragOver = useCallback((event: Event) => { event.preventDefault(); onDragOver?.(); }, []);
  const dragLeave = useCallback(() => { setIsOver(false); onDragLeave?.(); }, []);

  useEventListener('drop', drop, dropReference);
  useEventListener('dragenter', dragEnter, dropReference);
  useEventListener('dragover', dragOver, dropReference);
  useEventListener('dragleave', dragLeave, dropReference);

  return { dropReference, isOver }
}

export default useDrop