const addEnvironmentInKey = (key : string) : string => `${key}_${process.env.NODE_ENV}`;

export default addEnvironmentInKey;
