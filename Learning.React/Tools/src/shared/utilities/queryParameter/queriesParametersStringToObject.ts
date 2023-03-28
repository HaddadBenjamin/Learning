const queriesParametersStringToObject = (queryParameterString: string) : { [queryParameter:string] : string} => Object.fromEntries(new URLSearchParams(queryParameterString));

export default queriesParametersStringToObject;
