import { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const createBorrow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {book, quantity, dueDate} = req.body

        const deductCopies = await Book.deductCopies(book, quantity)


        res.status(201).json({
            success: true,
            message: "Book borrowed successfully!",
            data: 'newBorrow'
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