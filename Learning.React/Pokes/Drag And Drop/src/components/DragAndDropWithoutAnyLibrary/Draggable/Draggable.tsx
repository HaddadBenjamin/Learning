import styles from "./Draggable.module.css";
import { IDraggable} from "../../model";
import {FC, useContext} from "react";
import useDrag from "../../../shared/hooks/useDrag";
import { DragAndDropContext } from "../context";

const Draggable : FC<IDraggable> = (props) => {
  const { setDraggedElement } = useContext(DragAndDropContext)
  const { text } = props
  const { dragReference, isDragging } = useDrag<HTMLDivElement>({
    onDragStart : () => setDraggedElement?.(props)
  })

  return <div ref={dragReference}
              style={{ opacity: isDragging ? 0.5 : 1 }}
              draggable={true}
              className={styles.draggable}>
    {text}
  </div>;
}

export default Draggable