import { Router } from "express";
import * as borrow from "../controller/borrow.controller"

const borrowRoute = Router()

borrowRoute
        .route("/")
        .post(borrow.createBorrow)
        .get(borrow.getAllBorrow)

export default borrowRoute;