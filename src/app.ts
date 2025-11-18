import express, { Request, Response, type Application, NextFunction } from 'express'
import initRootRouter from './app/routes/root.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(express.json())

// Application routes
initRootRouter(app)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Library Management System API"
    })
})

// Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'API Endpoint Not Found',
        error: {
            path: req.originalUrl,
            message: 'The requested endpoint does not exist.'
        }
    })
})

// Global Error Handler - Must be the last middleware
app.use(globalErrorHandler)

export default app;