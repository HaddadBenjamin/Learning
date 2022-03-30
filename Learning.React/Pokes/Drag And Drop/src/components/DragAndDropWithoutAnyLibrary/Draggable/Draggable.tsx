import styles from "./Draggable.module.css";
import { DraggableTypes, IDraggable } from "../../model";
import { FC } from "react";
import useDrag from "../../../shared/hooks/useDrag";

const Draggable : FC<IDraggable> = (props) => {
  const { text } = props
  const { dragReference, isDragging } = useDrag<HTMLDivElement, IDraggable>({
    draggedElementKey : DraggableTypes.DRAGGABLE_TEXT,
    getDraggedElementProps : () => props,
  })

  return <div ref={dragReference}
              style={{ opacity: isDragging ? 0.5 : 1 }}
              draggable={true}
              className={styles.draggable}>
    {text}
  </div>;
}

export default Draggable