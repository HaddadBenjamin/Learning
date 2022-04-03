import {IDropzone, IDropzoneWithSingleDraggable} from "./model";

export const dropzonesMock : IDropzone[] = [
    { id : 'dropzone-1', draggables : [{ id : 'draggable-1', text : 'Faire de la R&D' }]},
    { id : 'dropzone-2', draggables : [] },
    { id : 'dropzone-3', draggables : [] },
  ]

export const dropzonesMock2 : IDropzoneWithSingleDraggable[] = [
    { id : 'dropzone-1', draggable : { id : 'draggable-1', text : 'Item 1' }},
    { id : 'dropzone-2', draggable : { id : 'draggable-2', text : 'Item 2'}},
    { id : 'dropzone-3', draggable: { id : 'draggable-3', text : 'Item 3' }},
]