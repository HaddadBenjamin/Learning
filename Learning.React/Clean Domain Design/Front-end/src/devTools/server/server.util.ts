import glob from 'glob'
import path from 'path'
import {Router, Request, Response, NextFunction} from "express";

const getApiMockPaths = async () => await new Promise<string[]>((resolve, reject) =>
    glob(path.join(process.cwd(), 'src/domains/**/*.apiMock.ts'),
        (error, files) =>
    {
        if (error) reject(error)
        else resolve(files)
    }))

export const loadApiMocks = async (router : Router) =>
{
    const apiMockPaths = await getApiMockPaths()

    await Promise.all(apiMockPaths.map(async (apiMockPath : string) =>
    {
        const apiMock = (await import(apiMockPath)).default

        apiMock(router)
    }))
}

export const corsMiddleware = (req : Request, res : Response, next : NextFunction) =>
{
    const { origin } = req.headers

    if (origin)
    {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    }

    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Origin')
    res.header('Access-Control-Allow-Credentials', 'true')

    next()
}
