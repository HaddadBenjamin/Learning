import styles from "./Draggable.module.css";
import {DraggableTypes, IDraggable, IDraggedElementProps} from "../../model";
import { FC } from "react";
import useDrag from "../../../shared/hooks/useDrag";

const Draggable : FC<IDraggedElementProps> = (props) => {
  const { dragReference, isDragging } = useDrag<HTMLDivElement, IDraggedElementProps>({
    getDraggedElementProps : () => props,
  })

  return <div ref={dragReference}
              style={{ opacity: isDragging ? 0.5 : 1 }}
              draggable={true}
              className={styles.draggable}>
    {props.draggable.text}
  </div>;
}

export default Draggable