import styles from "./Dropzone.module.css";
import {FC} from "react";
import { useDrop } from 'react-dnd'
import {DraggableTypes, IDraggable, IDropzone} from "../../model";
import Draggable from "../Draggable/Draggable";
import distinctBy from "../../../shared/utilities/array/distinctBy";

interface Props {
  dropzones : IDropzone[]
  setDropzones :  React.Dispatch<React.SetStateAction<IDropzone[]>>
}

const Dropzone : FC<IDropzone & Props> = ({ id, draggables, dropzones, setDropzones }) => {
  const [{ isOver }, dropReference] = useDrop(() => ({
    accept: DraggableTypes.DRAGGABLE_TEXT,
    drop : (draggable : IDraggable) => {
      let newDropzones : IDropzone[] = dropzones.map(dropzone => ({
        ...dropzone,
          draggables : (id === dropzone.id ? distinctBy([...dropzone.draggables, draggable], (a, b) => a.id === b.id) :
            dropzone.draggables.filter(d => draggable.id !== d.id)) as IDraggable[]
      }))

      setDropzones(newDropzones)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }), [])


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
