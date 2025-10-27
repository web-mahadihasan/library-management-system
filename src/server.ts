import 'dotenv/config'
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server
const PORT = process.env.PORT || 8000
console.log(process.env.DB_URL)

async function main() {
  await mongoose.connect(`${process.env.DB_URL}`);
   console.log("Connected to MongoDB Using Mongoose!!");
   server = app.listen(PORT, () => {
    console.log(`Server connected port ${PORT}`)    
   })
}

main()