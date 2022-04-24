import util from 'util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (object: any): string => util.inspect(object);
