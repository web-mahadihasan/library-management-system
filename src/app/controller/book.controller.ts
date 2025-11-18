import { Request, Response, NextFunction } from "express";
import { Book } from "../models/book.model";

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sortBy', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        // The remaining queryObj can be used for filtering, e.g., { genre: 'FANTASY' }
        let query = Book.find(queryObj);

        // 2. Sorting
        if (req.query.sortBy) {
            const sortBy = req.query.sortBy as string;
            const sortOrder = req.query.sort === 'desc' ? -1 : 1;
            query = query.sort({ [sortBy]: sortOrder });
        } else {
            query = query.sort({ createdAt: -1 });
        }

        // 4. Pagination
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 2;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Execute Query
        const books = await query;

        // Get total count for pagination metadata
        const totalBooks = await Book.countDocuments(queryObj);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully!",
            pagination: {
                page,
                limit,
                total: totalBooks,
                totalPages: Math.ceil(totalBooks / limit)
            },
            data: books
        });
    } catch (error) {
        next(error);
    }
}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookData = req.body;
        const newBook = await Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully!",
            data: newBook
        });
    } catch (error) {
        next(error);
    }
}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params?.bookId;
        const updatedData = req.body;

        const data = await Book.findByIdAndUpdate(bookId, updatedData, { new: true, runValidators: true });
        
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully!",
            data: data
        });
    } catch (error) {
        next(error);
    }
}

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const bookId = req.params.bookId

        let data;
        if(bookId) {
            data = await Book.findById(bookId)
        }

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully!",
            data: data
        });
    } catch (error) {
        next(error)
    }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId

        const data = await Book.findByIdAndDelete(bookId)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully!",
            data: null
        });
    } catch (error) {
        next(error)
    }
}