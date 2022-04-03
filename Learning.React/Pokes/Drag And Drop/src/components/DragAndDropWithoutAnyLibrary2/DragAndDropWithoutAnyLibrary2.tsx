import Dropzone from "./Dropzone/Dropzone";
import {useState} from "react";
import {dropzonesMock2} from "../mock";

const DragAndDropWithoutAnyLibrary2 = () => {
  const [dropzones, setDropzones] = useState(dropzonesMock2)

  return <div>
    <h2>Without Library Advanced</h2>
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

export default DragAndDropWithoutAnyLibrary2
