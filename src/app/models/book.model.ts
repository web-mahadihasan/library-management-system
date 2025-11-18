import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import { bookGenre } from "../constants/book.constants";

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, 'Title is a required'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Author is a required'],
            trim: true
        },
        genre: {
            type: String,
            required: [true, "Genre is a required"],
            enum: {
                values: bookGenre,
                message: 'Invalid genre. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.'
            }
        },
        isbn: {
            type: String,
            required: [true, 'ISBN is a required'],
            trim: true,
            unique: true
        },
        description: {
            type: String,
        },
        copies: {
            type: Number,
            required: [true, 'Copies is a required'],
            min: [0, 'Copies must be a non-negative number.'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for copies.'
            }
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Book = model<IBook>('Book', bookSchema);