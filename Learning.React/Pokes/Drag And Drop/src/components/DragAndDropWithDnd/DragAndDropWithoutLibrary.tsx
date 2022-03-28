import Dropzone from "./Dropzone/Dropzone";
import {dropzonesMock} from "../mock";
import {useState} from "react";

const DragAndDropWithoutLibrary = () => {
  const [dropzones, setDropzones] = useState(dropzonesMock)

  return <div>
    {
      dropzones.map(dropzone =>
        <Dropzone
          key={`dropzone-${dropzone.id}`}
          {...dropzone}
          dropzones={dropzones}
          setDropzones={setDropzones}/>)
    }
  </div>;
}

export default DragAndDropWithoutLibrary
