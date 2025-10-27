import express, { Request, Response, type Application } from 'express'

const app: Application = express()

app.use(express.json())


app.get("/", (req: Request, res: Response) => {
    res.status(403).json({
        status: 403,
        success: "false",
        message: "Access Denied"
    })
})

export default app;