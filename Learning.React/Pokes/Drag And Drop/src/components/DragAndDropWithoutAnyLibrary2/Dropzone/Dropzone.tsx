import styles from "./Dropzone.module.css";
import { FC } from "react";
import {IDraggable, IDraggedElementProps, IDropzoneWithSingleDraggable} from "../../model";
import Draggable from "../Draggable/Draggable";
import useDrop from "../../../shared/hooks/useDrop";

interface Props {
  dropzones : IDropzoneWithSingleDraggable[]
  setDropzones :  React.Dispatch<React.SetStateAction<IDropzoneWithSingleDraggable[]>>
}

const Dropzone : FC<IDropzoneWithSingleDraggable & Props> = ({ id, draggable, dropzones, setDropzones }) => {
  const { isOver, dropReference } = useDrop<HTMLDivElement, IDraggedElementProps>({
    onDragEnter :(draggedElementsProps) =>
    {
        if (id !== draggedElementsProps.dropzoneId)
        {
            const dropzoneIndex = dropzones.findIndex(d => d.id === id)
            const draggedDropzoneIndex = dropzones.findIndex(d => d.id === draggedElementsProps.dropzoneId)
            // remove dropzone with id draggedProps.dropzoneId
            const newDropzones = dropzones.filter((d, i) => i !== draggedDropzoneIndex)

            // add the deleted dropzone into the current dropzone index
            newDropzones.splice(dropzoneIndex, 0, dropzones[draggedDropzoneIndex]);

            setDropzones(newDropzones)
        }
    }
  })

  return <div className={styles.dropzone} ref={dropReference}
              style={{
                background: isOver ? 'red' : '',
                border : isOver ? '2px black dashed' : '',
                margin : isOver ? '6px 0' : '',
                width :  isOver ? '196px' : ''
  }}>
    {!isOver && draggable &&
        <Draggable dropzoneId={id} draggable={draggable} key={`draggable-${draggable.id}`}/> }
  </div>;
}

export default Dropzone