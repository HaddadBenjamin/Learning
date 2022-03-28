let draggedElement;

// Déclenché quand on commencer à déplacer un élément
document.addEventListener("dragstart", event => {
    if (event.target.className === 'draggable') {
        draggedElement = event.target;
        event.target.style.opacity = .5; // draggable
    }
});

// Déclenché quand on termine à déplacer un élément
document.addEventListener("dragend", event => {
    if (event.target.className === 'draggable') event.target.style.opacity = ""; // draggable
})

// Déclenché au début du survol de la dropzone
document.addEventListener("dragenter", event => {
    if (event.target.className == "dropzone") event.target.style.background = "blue"; // dropzone
});

// Déclenché tout au long du survol de la dropzone : sans preventDefault, ça ne fonctionne pas
document.addEventListener("dragover", event => event.preventDefault());

// Déclenché quand on sort de la zone de survol de la dropzone
document.addEventListener("dragleave", event => {
    if (event.target.className == "dropzone") event.target.style.background = ""; // dropzone
});

// Déclenché lorsqu'on lâche un élément
document.addEventListener("drop", event => {
    if (event.target.className == "dropzone") {
        event.target.style.background = ""; // draggableElement
        draggedElement.parentNode.removeChild(draggedElement); // oldDropzone
        event.target.appendChild(draggedElement); // dropzone
    }
});