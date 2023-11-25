import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'

// const port = 3000
//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', UserRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
console.log(process.cwd())
export default app
