const textToSiret = (text : string) : string => text.match(/.{1,3}/g).join(' ');

export default textToSiret;
