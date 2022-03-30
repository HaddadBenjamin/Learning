import Dropzone from "./Dropzone/Dropzone";
import {dropzonesMock} from "../mock";
import {useState} from "react";

const DragAndDropWithoutAnyLibrary = () => {
  const [dropzones, setDropzones] = useState(dropzonesMock)

  return <div>
    <h2>Without Any Library</h2>
    {
      dropzones.map(dropzone =>
        <Dropzone
          key={`dropzone-${dropzone.id}`}
          {...dropzone}
          dropzones={dropzones}
          setDropzones={setDropzones}/>)
    }
  </div>
}

export default DragAndDropWithoutAnyLibrary
