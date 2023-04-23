/* eslint-disable no-tabs */
interface IRemoveFalsiesObjectKeys {
	removeNull? : boolean,
	removeUndefined?: boolean,
	removeEmptyString? : boolean
}
let count;

0 || 'blabla'; // => blabla, car test un boolean
0 ?? 'blabla'; // => 0 ; car test si c’est définit
count = count ? +1 : count; // count &&= 1
// exemple :removeFalsiesObjectKeys({ a : null, b: undefined, c: 'blabla' }) => { c : 'blabla' }
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const removeFalsiesObjectKeys = (object: any, parameters?: IRemoveFalsiesObjectKeys) : any => {
  const { removeNull, removeUndefined, removeEmptyString } = parameters ?? { removeNull: true, removeUndefined: true, removeEmptyString: false };

  return Object.fromEntries(Object.entries(object).filter(([, value]) => (removeNull ? value !== null : true && removeEmptyString ? value !== null : true && removeUndefined ? value !== undefined : true)));
};

export default removeFalsiesObjectKeys;
