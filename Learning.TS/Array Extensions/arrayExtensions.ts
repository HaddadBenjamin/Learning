import {range} from "./arrayHelper";

export {};

declare global {
// All those methods are totally immutables
  interface Array<T> {
    skip(n: number): ReadonlyArray<T>;
    
    skipWhen(predicate: (element: T) => boolean): ReadonlyArray<T>;
    
    take(n: number): ReadonlyArray<T>;
    
    takeWhen(predicate: (element: T) => boolean): ReadonlyArray<T>;
    
    select<Y>(callback: (element: T) => Y): ReadonlyArray<Y>;
    
    selectMany<Y>(callback: (element: T) => Y[]): ReadonlyArray<Y>;
    
    any(predicate?: (element: T) => boolean): boolean;
    
    all(predicate: (element: T) => boolean): boolean;
    
    add(element: T): ReadonlyArray<T>;
    
    addRange(...elements: T[]): ReadonlyArray<T>;
    
    remove(element: T): ReadonlyArray<T>;
    
    removeWhen(predicate: (element: T) => boolean): ReadonlyArray<T>;
    
    where(predicate: (element: T) => boolean): ReadonlyArray<T>;
    
    distinct(): ReadonlyArray<T>;
    
    distinctBy<Y>(getSubElement: (element: T) => Y): ReadonlyArray<T>;
    
    first(): T;
    
    firstOrDefault(value: T): T;
    
    last(): T;
    
    lastOrDefault(value: T): T;
    
    count(): number;
    
    countBy(predicate: (element: T) => boolean): number;
    
    orderBy(callback: (element: T) => string | number | Date): ReadonlyArray<T>;
    
    orderByDesc(
      callback: (element: T) => string | number | Date
    ): ReadonlyArray<T>;
    
    inverse(): ReadonlyArray<T>;
    
    toDictionary<K, V>(
      getKey: (element: T) => K,
      getElement?: (element: T) => V | T
    ): Map<K, V | T>;
    
    // Fait maison :
    mapWithPrevious<Y>(callback: (previous: T | undefined, current: T) => Y): ReadonlyArray<Y>;
    
    filterWithPrevious(callback: (previous: T | undefined, current: T) => boolean): ReadonlyArray<T>;
    
    forEachWithPrevious(callback: (previous: T | undefined, current: T) => void): void;
    
    paginate(page: number, pageSize: number): ReadonlyArray<T>;
  }
}

if (!Array.prototype.skip) {
  Array.prototype.skip = function <T>(
    n: number
  ): readonly T[] {
    return this.slice(n);
  };
  
  Array.prototype.take = function <T>(
    this: readonly T[],
    n: number
  ): readonly T[] {
    return this.slice(0, n);
  };
  
  Array.prototype.takeWhen = function <T>(
    this: readonly T[],
    predicate: (element: T) => boolean
  ): readonly T[] {
    return (this as T[]).take(this.findIndex(element => !predicate(element)));
  };
  
  Array.prototype.skipWhen = function <T>(
    this: readonly T[],
    predicate: (element: T) => boolean
  ): readonly T[] {
    return (this as T[]).skip(this.findIndex(element => !predicate(element)));
  };
  
  Array.prototype.where = function <T>(
    this: readonly T[],
    predicate: (element: T) => boolean
  ): readonly T[] {
    return this.filter(predicate);
  };
  
  Array.prototype.select = function <T, Y>(
    this: readonly T[],
    callback: (element: T) => Y
  ): readonly Y[] {
    return this.map(callback);
  };
  
  Array.prototype.selectMany = function <T, Y>(
    this: readonly T[],
    callback: (element: T) => Y[]
  ): readonly Y[] {
    return this.map(callback).flat();
  };
  
  Array.prototype.any = function <T>(
    this: readonly T[],
    predicate?: (element: T) => boolean
  ): boolean {
    return !predicate ? this.length > 0 : !!this.find(predicate);
  };
  
  Array.prototype.all = function <T>(
    this: readonly T[],
    predicate: (element: T) => boolean
  ): boolean {
    return this.length === this.filter(predicate).length;
  };
  
  Array.prototype.add = function <T>(
    this: readonly T[],
    element: T
  ): readonly T[] {
    return [...this, element];
  };
  
  Array.prototype.addRange = function <T>(
    this: readonly T[],
    ...elements: T[]
  ): readonly T[] {
    return [...this, ...elements];
  };
  
  Array.prototype.remove = function <T>(
    this: readonly T[],
    element: T
  ): readonly T[] {
    return this.filter(item => !(item === element));
  };
  
  Array.prototype.removeWhen = function <T>(
    this: readonly T[],
    predicate: (element: T) => boolean
  ): readonly T[] {
    return this.filter(element => !predicate(element));
  };
  
  Array.prototype.distinct = function <T>(this: readonly T[]): readonly T[] {
    return this.filter(
      (element, index, self) => self.indexOf(element) === index
    );
  };
  
  Array.prototype.distinctBy = function <T, Y>(
    this: readonly T[],
    getSubElement: (element: T) => Y
  ): readonly T[] {
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
  
  Array.prototype.first = function <T>(this: readonly T[]): T {
    return this[0];
  };
  
  Array.prototype.firstOrDefault = function <T>(
    this: readonly T[],
    value: T
  ): T {
    return this.length === 0 ? value : this[0];
  };
  
  Array.prototype.last = function <T>(this: readonly T[]): T {
    return this[this.length - 1];
  };
  
  Array.prototype.lastOrDefault = function <T>(
    this: readonly T[],
    value: T
  ): T {
    return this.length === 0 ? value : this[this.length - 1];
  };
  
  Array.prototype.count = function <T>(this: readonly T[]): number {
    return this.length;
  };
  
  Array.prototype.countBy = function <T>(
    this: readonly T[],
    predicate: (element: T) => boolean
  ): number {
    return this.filter(predicate).length;
  };
  
  Array.prototype.orderBy = function <T>(
    this: readonly T[],
    callback: (element: T) => string | number | Date
  ): readonly T[] {
    return [...this].sort((a, b) => {
      const [left, right] = [callback(a), callback(b)];
      
      return typeof left === 'string'
        // @ts-ignore
        ? left.localeCompare(right)
        // @ts-ignore
        : left - right;
    });
  };
  
  Array.prototype.orderByDesc = function <T>(
    this: readonly T[],
    callback: (element: T) => string | number | Date
  ): readonly T[] {
    return [...this].sort((a, b) => {
      const [left, right] = [callback(a), callback(b)];
      
      return typeof left === 'string'
        // @ts-ignore
        ? right.localeCompare(left)
        // @ts-ignore
        : right - left;
    });
  };
  
  Array.prototype.inverse = function <T>(this: readonly T[]): readonly T[] {
    return [...this].reverse()
  };
  
  Array.prototype.toDictionary = function <T, K, V>(
    this: readonly T[],
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
  
  Array.prototype.mapWithPrevious = function <T, Y>(
    this: readonly T[],
    callback: (previous: T | undefined, current: T) => Y
  ): readonly Y[] {
    return this.map((element, index) =>
      callback(index > 0 ? this[index - 1] : undefined, element));
  };
  
  Array.prototype.filterWithPrevious = function <T>(
    this: readonly T[],
    callback: (previous: T | undefined, current: T) => boolean
  ): readonly T[] {
    return this.filter((element, index) =>
      callback(index > 0 ? this[index - 1] : undefined, element));
  };
  
  Array.prototype.forEachWithPrevious = function <T>(
    this: readonly T[],
    callback: (previous: T | undefined, current: T) => void
  ): void {
    return this.forEach((element, index) =>
      callback(index > 0 ? this[index - 1] : undefined, element));
  };
  
  Array.prototype.paginate = function <T>(this: readonly T[], page: number, pageSize: number): readonly T[] {
    return this.slice(pageSize * (page - 1)).slice(0, pageSize);
  };
}

// Exemples :
// console.log(
[
  [1, 2, 3, 4, 5, 6].skip(3), // [4, 5, 6]
  [1, 2, 3, 4, 5, 6].take(3), // [1, 2, 3]
  [1, 2, 3, 4, 5, 6].skipWhen(element => element < 3), // [3,4,5,6]
  [1, 2, 3, 4, 5, 6].takeWhen(element => element < 3), // [1,2]
  [{ a: 1 }, { a: 2 }].select(element => element.a), // [1, 2]
  [{ a: [1] }, { a: [2] }].selectMany(element => element.a), // [1, 2]
  [{a: 1}, {a: 2}].any(element => element.a === 2), // true
  [{a: 1}, {a: 2}].all(element => element.a === 2), // false
  [1, 2, 3].add(4), // [1,2,3,4]
  [1, 2, 3].addRange(4, 5, 6), // [1,2,3,4,5,6]
  [1, 2, 3].remove(2), // [1,3]
  [1, 2, 3, 4, 5, 6].removeWhen(element => element < 3), // [3,4,5,6]
  [1, 2, 2, 3].where(element => element > 2), // [3]
  [1, 2, 2, 3].distinct(), // [1,2,3]
  [{a: 1}, {a: 2}, {a: 2}, {a: 3}].distinctBy(element => element.a), // [1,2,3]
  [1, 2, 3].first(), // 1
  ([] as number[]).firstOrDefault(2), // 2
  [1, 2, 3].last(), // 3
  ([] as number[]).lastOrDefault(2), // 2
  [1, 2, 3].count(), // 3
  [1, 2, 3, 4, 5, 6].countBy(element => element % 3 === 0), // 2
  [4, 5, 6, 3, 2, 1].orderBy(element => element), // [1,2,3,4,5,6]
  [
    {d: Date.now(), index: 2},
    {d: Date.now() - 500, index: 1},
  ].orderBy(element => element.d), // [{index : 1}, { index : 2}]
  [
    {a: 2, b: ''},
    {a: 3, b: ''},
    {a: 1, b: ''},
  ].orderBy(element => element.a), // [{ a : 1, b : '' }, { a : 2, b : '' }, { a : 3, b : '' }],
  [4, 5, 6, 3, 2, 1].orderByDesc(element => element), // [6,5,4,3,2,1]
  [
    {d: Date.now(), index: 2},
    {d: Date.now() - 500, index: 1},
  ].orderByDesc(element => element.d), // [{index : 2}, { index : 1}]
  [
    {a: 2, b: ''},
    {a: 3, b: ''},
    {a: 1, b: ''},
  ].orderByDesc(element => element.a), // [{ a : 3, b : '' }, { a : 2, b : '' }, { a : 1, b : '' }]
  [1, 2, 3].inverse(), // [3, 2, 1]
  [
    {a: 1, id: 0},
    {a: 2, id: 1},
  ].toDictionary(element => element.id), // { 0 => { a: 1, id: 0 }, 1 => { a: 2, id: 1 } },
  [1, 2, 3].mapWithPrevious((previous, current) => previous ? previous + current : current), // [1, 3, 5]
  [1, 2, 3].filterWithPrevious((previous) => previous ? previous > 1 : false), // [3]
  range(501).paginate(5, 5) // [21, 22, 23, 24, 25]
]
// );