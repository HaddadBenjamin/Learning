import styles from "./Dropzone.module.css";
import {FC, useContext} from "react";
import { IDraggable, IDropzone } from "../../model";
import Draggable from "../Draggable/Draggable";
import distinctBy from "../../../shared/utilities/array/distinctBy";
import useDrop from "../../../shared/hooks/useDrop";
import { DragAndDropContext } from "../context";

interface Props {
  dropzones : IDropzone[]
  setDropzones :  React.Dispatch<React.SetStateAction<IDropzone[]>>
}

const Dropzone : FC<IDropzone & Props> = ({ id, draggables, dropzones, setDropzones }) => {
  const { getDraggedElement } = useContext(DragAndDropContext)
  const {isOver, dropReference} = useDrop<HTMLDivElement>({
    onDrop: () => {
      let newDropzones: IDropzone[] = dropzones.map(dropzone => ({
        ...dropzone,
        draggables: (id === dropzone.id ? distinctBy([...dropzone.draggables, getDraggedElement()], (a, b) => a?.id === b?.id) :
          dropzone.draggables.filter(d => getDraggedElement()?.id !== d.id)) as IDraggable[]
      }))

      setDropzones(newDropzones)
    },
  })

  return <div className={styles.dropzone} ref={dropReference}
              style={{
                background: isOver ? 'red' : '',
                border : isOver ? '2px black dashed' : '',
                margin : isOver ? '6px 0' : ''
  }}>
    {draggables.map(draggable => <Draggable {...draggable} key={`draggable-${draggable.id}`}/>) }
  </div>;
}

export default Dropzone