export {};

declare global {
// All those methods are totally immutables
  interface Map<K, V> {
    toDictionary<K, V, T>(
      getKey: (element: K) => K,
      getElement?: (element: V) => V | T
    ): Map<K, V | T>;

    groupBy<K, V, T>(getKey: (item: T) => K, map?: (item: T) => V): { key : K, value : (T | V)[] }[];

    mapToArray<K, V>(map : Map<K, V>) : { key : K, value : V }[];
  }
}
