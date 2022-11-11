const pageYOffset = (element: HTMLElement) : number => element.getBoundingClientRect().top + window.scrollY;

export default pageYOffset;
