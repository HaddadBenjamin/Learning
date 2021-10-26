export default (milliseconds: number): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, milliseconds));
