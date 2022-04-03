import Dropzone from "./Dropzone/Dropzone";
import {dropzonesMock} from "../mock";
import {useState} from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const DragAndDropWithDnd = () => {
  const [dropzones, setDropzones] = useState(dropzonesMock)

  return <DndProvider backend={HTML5Backend}>
    <div>
      <h2>With Dnd</h2>
      {
        dropzones.map(dropzone =>
          <Dropzone
            key={`dropzone-${dropzone.id}`}
            {...dropzone}
            dropzones={dropzones}
            setDropzones={setDropzones}/>)
      }
    </div>
  </DndProvider>
}

export default DragAndDropWithDnd
