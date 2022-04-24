const mapToArray = <K, V>(map : Map<K, V>) : { key : K, value : V }[] => Array.from(map, ([key, value]) => ({ key, value }));

export default mapToArray;
