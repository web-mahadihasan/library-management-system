import { Application, Router } from "express";
import booksRouter from "./books.routes"
import borrowRoute from "./borrow.routes";

const routes = [
    {
        path: '/api/v1/books',
        router: booksRouter
    },
    {
        path: '/api/v1/borrow',
        router: borrowRoute
    }
]

const initRootRouter = (app: Application) => {
    routes.forEach(route => {
        app.use(route.path, route.router)
    })
}

export default initRootRouter;