const isObject = (item: any): boolean => item && typeof item === 'object' && !Array.isArray(item);

export const deepMerge = (target: any, ...sources: any): any => {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source.keys) {// eslint-disable-line
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });

        deepMerge(target[key], source[key]);
      } else Object.assign(target, { [key]: source[key] });
    }
  }

  return deepMerge(target, ...sources);
};

export default isObject;
