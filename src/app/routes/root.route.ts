import { Application } from "express";
import booksRouter from "./books.routes"

const routes = [
    {
        path: '/api/v1/books',
        router: booksRouter
    }
]

const initRootRouter = (app: Application) => {
    routes.forEach(route => {
        app.use(route.path, route.router)
    })
}

export default initRootRouter;