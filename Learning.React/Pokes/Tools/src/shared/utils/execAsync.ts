import { exec } from "child_process"

export const execAsync = (command : string) : Promise<string> =>
  new Promise<string>((resolve, reject) =>
  {
    exec(command, (error, stdout, stderr) =>
    {
      if (error || stderr)
        reject(error ?? stderr)

      resolve(stdout)
    })
  })