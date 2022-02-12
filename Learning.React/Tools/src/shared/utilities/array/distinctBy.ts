const distinctBy = <T, Y>(array: T[], getSubElement: (element: T) => Y) : T[] =>
{
  const distinctElements: T[] = [];
  const map = new Map();

  // eslint-disable-next-line no-restricted-syntax
  for (const element of array)
  {
    const subElement = getSubElement(element);

    if (!map.has(subElement)) {
      map.set(subElement, true);
      distinctElements.push(element);
    }
  }

  return distinctElements;
};

export default distinctBy;