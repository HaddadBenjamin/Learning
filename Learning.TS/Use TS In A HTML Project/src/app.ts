const button = document.querySelector<HTMLButtonElement>('button')!

const onButtonClick = () => button.innerText = (parseInt(button.innerText) + 1).toString()

button.addEventListener('click', onButtonClick)