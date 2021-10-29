/* eslint-disable */
export {};

declare global {
  interface Array<T> {
    skip(n: number): Array<T>;
    skipWhen(predicate: (element: T) => boolean): Array<T>;

    take(n: number): Array<T>;
    takeWhen(predicate: (element: T) => boolean): Array<T>;

    select<Y>(callback: (element: T) => Y): Array<Y>;
    selectMany<Y>(callback: (element: T) => Y[]): Array<Y>;

    any(predicate?: (element: T) => boolean): boolean;
    all(predicate: (element: T) => boolean): boolean;

    add(element: T): Array<T>;
    remove(element: T): Array<T>;

    where(predicate: (element: T) => boolean): Array<T>;

    distinct(): Array<T>;
    distinctBy<Y>(getSubElement: (element: T) => Y): Array<T>;

    toDictionary<K, V>(
      getKey: (element: T) => K,
      getElement?: (element: T) => V | T
    ): Map<K, V | T>;
  }
}

if (!Array.prototype.skip) {
  Array.prototype.skip = function <T>(this: T[], n: number): T[] {
    return this.slice(n);
  };

  Array.prototype.take = function <T>(this: T[], n: number): T[] {
    return this.slice(0, n);
  };

  Array.prototype.takeWhen = function <T>(
    this: T[],
    predicate: (element: T) => boolean
  ): T[] {
    let numberOfElementsToTake = 0;

    for (let index = 0; index < this.length; index++) {
      if (predicate(this[index])) ++numberOfElementsToTake;
      else break;
    }
    return this.take(numberOfElementsToTake);
  };

  Array.prototype.skipWhen = function <T>(
    this: T[],
    predicate: (element: T) => boolean
  ): T[] {
    let numberOfElementsToSkip = 0;

    for (let index = 0; index < this.length; index++) {
      if (predicate(this[index])) ++numberOfElementsToSkip;
      else break;
    }
    return this.skip(numberOfElementsToSkip);
  };

  Array.prototype.where = function <T>(
    this: T[],
    predicate: (element: T) => boolean
  ): T[] {
    return this.filter(predicate);
  };

  Array.prototype.select = function <T, Y>(
    this: T[],
    callback: (element: T) => Y
  ): Y[] {
    return this.map(callback);
  };

  Array.prototype.selectMany = function <T, Y>(
    this: T[],
    callback: (element: T) => Y[]
  ): Y[] {
    return this.map(callback).flat();
  };

  Array.prototype.any = function <T>(
    this: T[],
    predicate?: (element: T) => boolean
  ): any {
    if (!predicate) return this.length > 0;

    for (const element of this) if (predicate(element)) return true;

    return false;
  };

  Array.prototype.all = function <T>(
    this: T[],
    predicate: (element: T) => boolean
  ): any {
    for (const element of this) if (!predicate(element)) return false;

    return true;
  };

  Array.prototype.add = function <T>(this: T[], element: T): T[] {
    return [...this, element];
  };

  Array.prototype.remove = function <T>(this: T[], element: T): T[] {
    for (let index = 0; index < this.length; index++)
      if (this[index] === element) this.splice(index, 1);

    return this;
  };

  Array.prototype.distinct = function <T>(this: T[]): T[] {
    return this.filter(
      (element, index, self) => self.indexOf(element) === index
    );
  };

  Array.prototype.distinctBy = function <T, Y>(
    this: T[],
    getSubElement: (element: T) => Y
  ): T[] {
    const distinctElements: T[] = [];
    const map = new Map();

    for (const element of this) {
      const subElement = getSubElement(element);

      if (!map.has(subElement)) {
        map.set(subElement, true);
        distinctElements.push(element);
      }
    }

    return distinctElements;
  };

  Array.prototype.toDictionary = function <T, K, V>(
    this: T[],
    getKey: (element: T) => K,
    getElement?: (element: T) => V | T
  ): Map<K, V | T> {
    return new Map<K, V | T>(
      this.map(element => [
        getKey(element),
        getElement ? getElement(element) : element,
      ])
    );
  };
}

// Exemples :
console.log(
  [1, 2, 3, 4, 5, 6].skip(3), // [4, 5, 6]
  [1, 2, 3, 4, 5, 6].take(3), // [1, 2, 3]
  [1, 2, 3, 4, 5, 6].skipWhen(element => element < 3), // [3,4,5,6]
  [1, 2, 3, 4, 5, 6].takeWhen(element => element < 3), // [1,2]
  [{ a: 1 }, { a: 2 }].select(element => element.a), // [1, 2]
  [{ a: [1] }, { a: [2] }].selectMany(element => element.a), // [1, 2]
  [{ a: 1 }, { a: 2 }].any(element => element.a === 2), // true
  [{ a: 1 }, { a: 2 }].all(element => element.a === 2), // false
  [1, 2, 3].add(4), // [1,2,3,4]
  [1, 2, 3].remove(2), // [1,3]
  [1, 2, 2, 3].where(element => element > 2), // [3]
  [1, 2, 2, 3].distinct(), // [1,2,3]
  [
    { a: 1, id: 0 },
    { a: 2, id: 1 },
  ].toDictionary(element => element.id)
); // { 0 => { a: 1, id: 0 }, 1 => { a: 2, id: 1 } }
// TU tout ça
// Voir les fonctions que je peux rajouter
// Envoyer ça à Matthieu & Chris
// AddRange
// removeWhen =>
// removeAll => inverse de filter
