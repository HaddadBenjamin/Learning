const excludeNullOrUndefine = (array : any[]) : any[] => array.filter((element) => element !== null && element !== undefined);

export default excludeNullOrUndefine;
