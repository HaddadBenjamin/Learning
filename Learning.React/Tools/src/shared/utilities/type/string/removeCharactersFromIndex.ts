const removeCharactersFromIndex = (text: string, index: number, characterCount = 1) => `${text.slice(0, index)}${text.slice(index + characterCount)}`;

export default removeCharactersFromIndex;
