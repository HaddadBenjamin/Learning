/* eslint-disable */
export {};

declare global {
  // @ts-ignore
  interface String {
    toTitleCase() : string; // Title case
    toCamelCase() : string; // camelCase

    split(chunkLength : number) : string[];
  }
}

if (!String.prototype.toTitleCase) {
  String.prototype.toTitleCase = function(this: string): string {
    return this.replace(
      /\w\S*/g,
      (text : string) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
    )
  };

  String.prototype.toCamelCase = function(this: string): string {
    return this.replace(/(?:^\w|[A-Z]|\b\w)/g, (word : string, index : number) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
  };

  String.prototype.split = function(this: string, chunkLength : number): string[] {
    let chunks : string[] = [];

    for (let i = 0; i < this.length; i += chunkLength)
      chunks.push(this.substring(i, i + chunkLength));

    return  chunks
  };
}

// Exemples :
// console.log(
[
  'blabla blabla'.toTitleCase(), // 'Blabla Blabla'
  'blabla blabla'.toCamelCase(), // 'blablaBlabla'
  'blabla blabla'.toPascalCase(), // 'BlablaBlabla'
  'abcdefghij'.split(3), // ['abc', 'def', 'ghi', 'j']
]
// );