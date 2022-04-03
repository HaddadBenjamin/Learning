import styles from "./Dropzone.module.css";
import { FC } from "react";
import { DraggableTypes, IDraggable, IDropzone } from "../../model";
import Draggable from "../Draggable/Draggable";
import distinctBy from "../../../shared/utilities/array/distinctBy";
import useDrop from "../../../shared/hooks/useDrop";

interface Props {
  dropzones : IDropzone[]
  setDropzones :  React.Dispatch<React.SetStateAction<IDropzone[]>>
}

const Dropzone : FC<IDropzone & Props> = ({ id, draggables, dropzones, setDropzones }) => {
  const { isOver, dropReference } = useDrop<HTMLDivElement, IDraggable>({
    onDrop: (draggedElementsProps) => {
      let newDropzones: IDropzone[] = dropzones.map(dropzone => ({
        ...dropzone,
        draggables: (id === dropzone.id ? distinctBy([...dropzone.draggables, draggedElementsProps], (a, b) => a?.id === b?.id) :
          dropzone.draggables.filter(d => draggedElementsProps?.id !== d.id)) as IDraggable[]
      }))

      setDropzones(newDropzones)
    },
  })

  return <div className={styles.dropzone} ref={dropReference}
              style={{
                background: isOver ? 'red' : '',
                border : isOver ? '2px black dashed' : '',
                margin : isOver ? '6px 0' : '',
                width :  isOver ? '196px' : ''
  }}>
    {draggables.map(draggable => <Draggable {...draggable} key={`draggable-${draggable.id}`}/>) }
  </div>;
}

export default Dropzone