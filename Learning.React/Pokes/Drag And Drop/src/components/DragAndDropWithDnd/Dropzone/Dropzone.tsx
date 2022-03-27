import styles from "./Dropzone.module.css";
import {FC} from "react";
import { useDrop } from 'react-dnd'
import {DraggableTypes} from "../DraggableEnumeration";

const Dropzone : FC = ({children}) => {
  const [{ isOver }, dropReference] = useDrop(() => ({
    accept: DraggableTypes.DRAGGABLE,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }), [])


  return <div className={styles.dropzone} ref={dropReference}>
    {children}
  </div>;
}

export default Dropzone
