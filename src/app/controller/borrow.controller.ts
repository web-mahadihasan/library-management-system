import { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const createBorrow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body

        const newBorrow = await Borrow.create(body)

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully!",
            data: newBorrow
        });

    } catch (error) {
        next(error)
    }
}

export const getAllBorrow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Borrow.find({})

        res.status(201).json({
            success: true,
            message: "Borrow created successfully!",
            data: data
        });
    } catch (error) {
        next(error)
    }
}