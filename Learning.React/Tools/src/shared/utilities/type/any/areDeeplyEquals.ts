const areDeeplyEquals = (o1 : any, o2 : any) : boolean => {
  if (o1 === o2) return true;

  if (o1 == null || o2 == null || typeof o1 !== 'object' || typeof o2 !== 'object') return o1 === o2;

  const ctor1 = o1.constructor;
  if (ctor1 !== o2.constructor) return false;

  const keys2 = Object.keys(o2);
  if (Object.keys(o1).length !== keys2.length) return false;

  const keys1 = Object.keys(o1);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (!keys2.includes(key) || !areDeeplyEquals(o1[key], o2[key])) return false;
  }

  return true;
};

export default areDeeplyEquals;
