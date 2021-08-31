import express, { Router } from 'express'
import {corsMiddleware, loadApiMocks} from "./server.util";

const PORT = 3001
const app = express()
const router = Router();

app.use(express.json())
app.use(corsMiddleware)

app.listen(PORT, async () =>
{
    console.log(`%c API mocks listening http://localhost:${PORT}`, 'background: #222; color: #bada55');
    await loadApiMocks(router)
})

