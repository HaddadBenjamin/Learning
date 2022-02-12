const groupBy = <T, K, V>(
  array: T[],
  getKey: (element: T) => K,
  map?: (item: T) => V
)  : Map<K, (T | V)[]> =>
  array.reduce((groupedElements, element) => {
    const key = getKey(element)
    const mappedElement = map ? map(element) : element

    if (!groupedElements.has(key)) groupedElements.set(key, [mappedElement])
    // @ts-ignore
    else groupedElements.get(key).push(mappedElement)

    return groupedElements
  }, new Map<K, (T | V)[]>())

export default groupBy;
