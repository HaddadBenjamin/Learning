import styles from "./Draggable.module.css";
import { useDrag } from 'react-dnd'
import {DraggableTypes} from "../DraggableEnumeration";

const Draggable = () => {
  const [{ isDragging }, dragReference] = useDrag(() => ({
    type: DraggableTypes.DRAGGABLE,
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }))

  return <div
    ref={dragReference}
    style={{ opacity: isDragging ? 0.5 : 1 }}
    className={styles.draggable}>This div is draggable
  </div>;
}

export default Draggable