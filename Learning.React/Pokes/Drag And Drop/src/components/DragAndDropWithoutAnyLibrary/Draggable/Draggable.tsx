import styles from "./Draggable.module.css";
import { IDraggable} from "../../model";
import { FC } from "react";
import useDrag from "../../../shared/hooks/useDrag";
import { draggedElement } from "../state";

const Draggable : FC<IDraggable> = (props) => {
  const { text } = props
  const { dragReference, isDragging } = useDrag<HTMLDivElement>({
    // @ts-ignore
    onDragStart : () => draggedElement = props
  })

  return <div ref={dragReference}
              style={{ opacity: isDragging ? 0.5 : 1 }}
              draggable={true}
              className={styles.draggable}>
    {text}
  </div>;
}

export default Draggable