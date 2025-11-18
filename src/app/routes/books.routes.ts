import { Router } from "express";
import * as books from "../controller/book.controller"

const booksRouter = Router()

booksRouter
    .route("/")
    .get(books.getAllBooks)
    .post(books.createBook)
booksRouter
    .route("/:bookId")
    .put(books.updateBook)
    .get(books.getBookById)
    .delete(books.deleteBook)

export default booksRouter;