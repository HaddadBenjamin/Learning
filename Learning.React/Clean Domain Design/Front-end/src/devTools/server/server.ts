import express, { Router } from 'express'
import {corsMiddleware, loadApiMocks} from "./server.util";
import {loadApiMocks, showRoutes} from "./server.util";
import cors from 'cors'

const PORT = 3001
const app = express()
const router = Router();

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.listen(PORT, async () =>
{
    console.log(`%c API mocks listening http://localhost:${PORT}`, 'background: #222; color: #bada55');
    await loadApiMocks(router)
    console.log(showRoutes(app))
})

