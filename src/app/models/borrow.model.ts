import { model, Schema, Types } from 'mongoose';
import { IBorrow } from './../interfaces/borrow.interface';
import { Book } from './book.model';

const borrowSchema = new Schema<IBorrow> (
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Book Id must be need"],
            validate: {
                validator: async (id: Types.ObjectId) => {
                    const book = await Book.findById(id);
                    return !!book;
                },
                message: "Book does not exist"
            }
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, 'Quantity must be a positive number.'],
            validate: {   
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for quantity'
            }
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Borrow = model<IBorrow>('Borrow', borrowSchema)