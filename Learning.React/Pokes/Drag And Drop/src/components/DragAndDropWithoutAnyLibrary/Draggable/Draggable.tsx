import styles from "./Draggable.module.css";
import { IDraggable} from "../../model";
import { FC } from "react";
import useDrag from "../../../shared/hooks/useDrag";

const Draggable : FC<IDraggable> = ({ text }) => {
  const { dragReference, isDragging } = useDrag<HTMLDivElement>({})

  return <div ref={dragReference}
              style={{ opacity: isDragging ? 0.5 : 1 }}
              draggable={true}
              className={styles.draggable}>
    {text}
  </div>;
}

export default Draggable