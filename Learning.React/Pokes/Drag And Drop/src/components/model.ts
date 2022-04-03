export const DraggableTypes = {  DRAGGABLE_TEXT : 'draggable text' }

export interface IDraggable {
  id : string
  text : string
}

export interface IDropzone {
  id : string
  draggables : IDraggable[]
}

export interface IDropzoneWithSingleDraggable {
  id : string
  draggable? : IDraggable
}

export interface IDraggedElementProps {
  dropzoneId : string,
  draggable : IDraggable
}