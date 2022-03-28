import styles from "./Draggable.module.css";
import { useDrag } from 'react-dnd'
import {DraggableTypes, IDraggable} from "../../model";
import {FC} from "react";

const Draggable : FC<IDraggable> = (props) => {
  const { text } = props
  const [{ isDragging }, dragReference] = useDrag(() => ({
    type: DraggableTypes.DRAGGABLE_TEXT,
    item : props, // les données de l'élément que l'on drag
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }))

  return <div ref={dragReference}
              style={{ opacity: isDragging ? 0.5 : 1 }}
              className={styles.draggable}>
    {text}
  </div>;
}

export default Draggable