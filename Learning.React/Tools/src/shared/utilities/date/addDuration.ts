/* eslint-disable no-restricted-syntax,@typescript-eslint/no-non-null-asserted-optional-chain,no-tabs,no-undef */
const durationMap : [string, number][] = [['years', 0], ['months', 1], ['days', 2], ['hours', 3], ['minutes', 4], ['seconds', 5], ['milliseconds', 6]];
const durationStringToDurationIndex = (durationString: string) : number => durationMap.find(([key]) => key === durationString)?.[1]!;

interface IAddDuration {
	years?: number
	months?: number
	days?: number
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
}

// Exemple :
// const future = addDuration(new Date(), {
//   months: 2,
//   days: 1,
//   minutes: 3,
// });
const addDuration = (date : Date, interval: IAddDuration) => {
  const dateDurations = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];

  for (const [key, value] of Object.entries(interval)) dateDurations[durationStringToDurationIndex(key)] += value;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Date(...parts);
};

export default addDuration;
