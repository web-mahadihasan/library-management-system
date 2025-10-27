import 'dotenv/config'
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server
const PORT = process.env.PORT || 8000

async function main() {
  await mongoose.connect(`${process.env.DB_URL}`);
   console.log("\x1b[32m%s\x1b[0m", "✅ Connected to MongoDB Using Mongoose!!");
   server = app.listen(PORT, () => {
    console.log(`\x1b[1m\x1b[35m🚀 Server connected port ${PORT}\x1b[0m`)    
   })
}

main()