/* eslint-disable */
export {};

declare global {
  // @ts-ignore
  interface String {
    toTitleCase() : string; // Title case
    toCamelCase() : string; // camelCase
    toPascalCase() : string; // aka UpperCamelCase
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

  String.prototype.toPascalCase = function(this: string): string {
    return this.replace(/\w+/g,
      word => word[0].toUpperCase() + word.slice(1).toLowerCase())
  };
}

// Exemples :
// console.log(
[
  'blabla blabla'.toTitleCase(), // 'Blabla Blabla'
]
// );