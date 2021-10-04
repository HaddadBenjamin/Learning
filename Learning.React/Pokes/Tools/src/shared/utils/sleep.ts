export const sleep = (milliseconds : number) : Promise<any> =>
  new Promise(resolve => setTimeout(resolve, milliseconds))