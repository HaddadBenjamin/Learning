"use strict";
const button = document.querySelector('button');
const onButtonClick = () => {
    button.innerText = (parseInt(button.innerText) + 1).toString();
};
button.addEventListener('click', onButtonClick);
