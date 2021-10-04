import util from 'util'

export const objectTostring = (object : any) : string =>
  util.inspect(object)