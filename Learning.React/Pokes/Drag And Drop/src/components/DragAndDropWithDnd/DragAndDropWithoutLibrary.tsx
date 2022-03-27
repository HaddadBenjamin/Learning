import Dropzone from "./Dropzone/Dropzone";
import Draggable from "./Draggable/Draggable";

const DragAndDropWithoutLibrary = () => <div>
  <Dropzone>
    <Draggable/>
  </Dropzone>

  <Dropzone/>
  <Dropzone/>
  <Dropzone/>
</div>

export default DragAndDropWithoutLibrary
