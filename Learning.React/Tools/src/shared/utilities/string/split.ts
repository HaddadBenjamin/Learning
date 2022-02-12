const split = (text : string, chunkLength : number): string[] =>
{
  let chunks : string[] = [];

  for (let i = 0; i < text.length; i += chunkLength)
    chunks.push(text.substring(i, i + chunkLength));

  return  chunks
};

export default split;
