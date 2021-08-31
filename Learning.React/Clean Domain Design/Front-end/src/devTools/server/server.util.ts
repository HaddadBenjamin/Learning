import glob from 'glob'
import path from 'path'
import {Express} from "express";

const getApiMockPaths = async () => await new Promise<string[]>((resolve, reject) =>
    glob(path.join(process.cwd(), 'src/domains/**/*.apiMock.ts'),
        (error, files) =>
    {
        if (error) reject(error)
        else resolve(files)
    }))

export const loadApiMocks = async (app : Express) =>
{
    const apiMockPaths = await getApiMockPaths()

    await Promise.all(apiMockPaths.map(async (apiMockPath : string) =>
    {
        const apiMock = (await import(apiMockPath)).default

        apiMock(app)
    }))
}

let routes : string[] = [];
export const getRoutes = (app : Express) : string[] =>
{
    app._router.stack.forEach((middleware: any) =>
    {
        if (middleware.route)
            routes.push(middleware.route);

        else if (middleware.name === 'router')
            middleware.handle.stack.forEach((handler: any) =>
                handler.route && routes.push(handler.route));
    });

    return routes
}