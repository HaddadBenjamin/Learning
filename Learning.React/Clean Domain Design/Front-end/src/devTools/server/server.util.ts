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

let route, routes : string[] = [];
export const getRoutes = (app : Express) : string[] => {
    app._router.stack.forEach(function (middleware: any) {
        if (middleware.route) { // routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === 'router') { // router middleware
            middleware.handle.stack.forEach(function (handler: any) {
                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    return routes
}