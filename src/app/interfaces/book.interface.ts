import { promises } from "dns";
import { Document, Model, Types } from "mongoose";

export interface IBook extends Document {
    title: string,
    author: string,
    genre: string,
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}

export interface BookStaticMethod extends Model<IBook>{
    deductCopies(bookId: Types.ObjectId, quantity: number): Promise<any>
}